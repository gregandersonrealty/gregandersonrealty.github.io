import type { ReactNode } from "react";
import type { JSONContent } from "@tiptap/react";

function parseYouTubeTimeToSeconds(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  const match = trimmed.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match) return null;
  const h = match[1] ? Number(match[1]) : 0;
  const m = match[2] ? Number(match[2]) : 0;
  const s = match[3] ? Number(match[3]) : 0;
  const total = h * 3600 + m * 60 + s;
  return total > 0 ? total : null;
}

function coerceYouTubeSrcToEmbed(input: string): string {
  const raw = input.trim();
  if (!raw) return "";
  if (raw.startsWith("https://www.youtube-nocookie.com/embed/") || raw.startsWith("https://www.youtube.com/embed/")) {
    return raw;
  }

  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw.replace(/^\/\/+/, "")}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return "";
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  let videoId: string | null = null;

  if (host === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
  } else if (host === "youtube.com" || host === "m.youtube.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    if (url.pathname === "/watch") videoId = url.searchParams.get("v");
    else if (parts[0] === "shorts" && parts[1]) videoId = parts[1];
    else if (parts[0] === "embed" && parts[1]) videoId = parts[1];
    else if (parts[0] === "live" && parts[1]) videoId = parts[1];
  }

  if (!videoId || !/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) return "";

  const startRaw = url.searchParams.get("start") || url.searchParams.get("t") || "";
  const start = parseYouTubeTimeToSeconds(startRaw);

  const embed = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
  embed.searchParams.set("rel", "0");
  embed.searchParams.set("modestbranding", "1");
  if (start) embed.searchParams.set("start", String(start));
  return embed.toString();
}

function renderMarks(text: string, marks: any[] | undefined): ReactNode {
  let node: ReactNode = text;
  for (const mark of marks || []) {
    if (!mark || typeof mark.type !== "string") continue;

    if (mark.type === "bold") node = <strong>{node}</strong>;
    else if (mark.type === "italic") node = <em>{node}</em>;
    else if (mark.type === "underline") node = <u>{node}</u>;
    else if (mark.type === "code") node = <code className="rounded bg-secondary px-1 py-0.5">{node}</code>;
    else if (mark.type === "link") {
      const href = typeof mark?.attrs?.href === "string" ? mark.attrs.href : "";
      const safeHref = href.startsWith("http://") || href.startsWith("https://") ? href : "";
      node = (
        <a
          href={safeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2"
        >
          {node}
        </a>
      );
    }
  }
  return node;
}

function renderNode(node: any, key: string): ReactNode {
  if (!node || typeof node !== "object") return null;

  if (node.type === "text") {
    const text = typeof node.text === "string" ? node.text : "";
    return <span key={key}>{renderMarks(text, node.marks)}</span>;
  }

  const children = Array.isArray(node.content)
    ? node.content.map((child: any, idx: number) => renderNode(child, `${key}-${idx}`))
    : null;

  switch (node.type) {
    case "doc":
      return <>{children}</>;

    case "paragraph":
      return (
        <p key={key} className="leading-relaxed text-foreground/90">
          {children}
        </p>
      );

    case "heading": {
      const level = Number(node?.attrs?.level || 2);
      if (level === 1) return <h1 key={key} className="font-display text-3xl font-semibold mt-6">{children}</h1>;
      if (level === 3) return <h3 key={key} className="font-display text-xl font-semibold mt-6">{children}</h3>;
      return <h2 key={key} className="font-display text-2xl font-semibold mt-6">{children}</h2>;
    }

    case "bulletList":
      return <ul key={key} className="list-disc pl-6 space-y-2">{children}</ul>;

    case "orderedList":
      return <ol key={key} className="list-decimal pl-6 space-y-2">{children}</ol>;

    case "listItem":
      return <li key={key}>{children}</li>;

    case "blockquote":
      return (
        <blockquote key={key} className="border-l-4 border-border pl-4 text-foreground/80">
          {children}
        </blockquote>
      );

    case "hardBreak":
      return <br key={key} />;

    case "image": {
      const src = typeof node?.attrs?.src === "string" ? node.attrs.src : "";
      const alt = typeof node?.attrs?.alt === "string" ? node.attrs.alt : "";
      const title = typeof node?.attrs?.title === "string" ? node.attrs.title : "";
      if (!src) return null;
      return (
        <figure key={key} className="my-6">
          <img src={src} alt={alt || title || ""} className="w-full rounded-xl border" loading="lazy" />
          {title ? <figcaption className="mt-2 text-sm text-muted-foreground">{title}</figcaption> : null}
        </figure>
      );
    }

    case "youtube": {
      const src = typeof node?.attrs?.src === "string" ? node.attrs.src : "";
      const safeSrc = coerceYouTubeSrcToEmbed(src);
      if (!safeSrc) return null;

      // Provide sane defaults if the extension omitted them.
      const width = Number(node?.attrs?.width || 640);
      const height = Number(node?.attrs?.height || 360);

      return (
        <div key={key} className="my-6">
          <div className="relative w-full overflow-hidden rounded-xl border bg-black" style={{ aspectRatio: `${width} / ${height}` }}>
            <iframe
              src={safeSrc}
              title="YouTube video"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      );
    }

    case "video": {
      const src = typeof node?.attrs?.src === "string" ? node.attrs.src : "";
      const title = typeof node?.attrs?.title === "string" ? node.attrs.title : "";
      const safeSrc = src.startsWith("https://") ? src : "";
      if (!safeSrc) return null;

      return (
        <figure key={key} className="my-6">
          <video
            src={safeSrc}
            controls
            preload="metadata"
            className="w-full rounded-xl border bg-black"
          />
          {title ? <figcaption className="mt-2 text-sm text-muted-foreground">{title}</figcaption> : null}
        </figure>
      );
    }

    default:
      return <>{children}</>;
  }
}

export function TiptapRenderer({ doc }: { doc: JSONContent }) {
  return <div className="space-y-4">{renderNode(doc, "root")}</div>;
}
