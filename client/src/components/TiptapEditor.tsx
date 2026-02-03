import { EditorContent, ReactNodeViewRenderer, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Video } from "@/lib/tiptapVideo";
import { ResizableImage } from "@/lib/tiptapImage";
import { ResizableImageNodeView } from "@/components/ResizableImageNodeView";

const DEFAULT_BUCKET = import.meta.env.VITE_SUPABASE_BLOG_IMAGES_BUCKET || "blog-images";

function parseYouTubeTimeToSeconds(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Supports: 90, 90s, 1m30s, 1h2m3s
  if (/^\d+$/.test(trimmed)) return Number(trimmed);

  const match = trimmed.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match) return null;
  const h = match[1] ? Number(match[1]) : 0;
  const m = match[2] ? Number(match[2]) : 0;
  const s = match[3] ? Number(match[3]) : 0;
  const total = h * 3600 + m * 60 + s;
  return total > 0 ? total : null;
}

function toYouTubeEmbedUrl(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw.replace(/^\/\/+/, "")}`;

  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  let videoId: string | null = null;
  if (host === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
  } else if (host === "youtube.com" || host === "m.youtube.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    if (url.pathname === "/watch") {
      videoId = url.searchParams.get("v");
    } else if (parts[0] === "shorts" && parts[1]) {
      videoId = parts[1];
    } else if (parts[0] === "embed" && parts[1]) {
      videoId = parts[1];
    } else if (parts[0] === "live" && parts[1]) {
      videoId = parts[1];
    }
  }

  if (!videoId) return null;
  // Basic hardening; YouTube IDs are typically 11 chars but can vary.
  if (!/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) return null;

  const startRaw = url.searchParams.get("start") || url.searchParams.get("t") || "";
  const start = parseYouTubeTimeToSeconds(startRaw);

  const embed = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
  embed.searchParams.set("rel", "0");
  embed.searchParams.set("modestbranding", "1");
  if (start) embed.searchParams.set("start", String(start));
  return embed.toString();
}

function safeUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function uploadImageToSupabase(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const filename = `${Date.now()}-${safeUuid()}.${ext}`;
  const path = `tiptap/${filename}`;

  const { error } = await supabase.storage.from(DEFAULT_BUCKET).upload(path, file, {
    contentType: file.type || "application/octet-stream",
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(DEFAULT_BUCKET).getPublicUrl(path);
  const publicUrl = data?.publicUrl;
  if (!publicUrl) throw new Error("Failed to generate a public URL for uploaded image");
  return publicUrl;
}

async function uploadVideoToSupabase(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "mp4").toLowerCase();
  const filename = `${Date.now()}-${safeUuid()}.${ext}`;
  const path = `tiptap/videos/${filename}`;

  const { error } = await supabase.storage.from(DEFAULT_BUCKET).upload(path, file, {
    contentType: file.type || "application/octet-stream",
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(DEFAULT_BUCKET).getPublicUrl(path);
  const publicUrl = data?.publicUrl;
  if (!publicUrl) throw new Error("Failed to generate a public URL for uploaded video");
  return publicUrl;
}

function ToolbarButton({
  active,
  disabled,
  label,
  onClick,
}: {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={
        "rounded-md border px-2 py-1 text-sm transition-colors disabled:cursor-not-allowed cursor-pointer " +
        (active
          ? "bg-primary text-primary-foreground"
          : "bg-background hover:bg-secondary") +
        (disabled ? " opacity-50" : "")
      }
    >
      {label}
    </button>
  );
}

export function TiptapEditor({
  initialDoc,
  onChange,
  onUploadStateChange,
}: {
  initialDoc: JSONContent;
  onChange: (doc: JSONContent) => void;
  onUploadStateChange?: (uploading: boolean) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const setUploadingSafe = (value: boolean) => {
    setUploading(value);
    onUploadStateChange?.(value);
  };

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
          class: "text-primary underline underline-offset-2",
        },
      }),
      ResizableImage.extend({
        addNodeView() {
          return ReactNodeViewRenderer(ResizableImageNodeView);
        },
      }).configure({
        inline: false,
        allowBase64: false,
      }),
      Youtube,
      Video,
      Placeholder.configure({
        placeholder: "Write your post…",
      }),
    ],
    [],
  );

  const editor = useEditor({
    extensions,
    content: initialDoc,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[320px] px-3 py-2",
      },
      handlePaste: (view, event) => {
        const dt = event.clipboardData;
        if (!dt) return false;
        const files = Array.from(dt.files || []);
        const video = files.find((f) => f.type.startsWith("video/"));
        const image = files.find((f) => f.type.startsWith("image/"));
        if (!video && !image) return false;

        event.preventDefault();
        (async () => {
          try {
            setUploadingSafe(true);
            if (video) {
              const url = await uploadVideoToSupabase(video);
              editor?.chain().focus().setVideo({ src: url, title: video.name }).run();
            } else if (image) {
              const url = await uploadImageToSupabase(image);
              editor
                ?.chain()
                .focus()
                .insertContent({ type: "image", attrs: { src: url, width: "100%" } })
                .run();
            }
          } catch (e) {
            console.error("Media paste upload failed", e);
          } finally {
            setUploadingSafe(false);
          }
        })();

        return true;
      },
      handleDrop: (view, event) => {
        const dt = event.dataTransfer;
        if (!dt) return false;
        const files = Array.from(dt.files || []);
        const video = files.find((f) => f.type.startsWith("video/"));
        const image = files.find((f) => f.type.startsWith("image/"));
        if (!video && !image) return false;

        event.preventDefault();
        (async () => {
          try {
            setUploadingSafe(true);
            if (video) {
              const url = await uploadVideoToSupabase(video);
              editor?.chain().focus().setVideo({ src: url, title: video.name }).run();
            } else if (image) {
              const url = await uploadImageToSupabase(image);
              editor
                ?.chain()
                .focus()
                .insertContent({ type: "image", attrs: { src: url, width: "100%" } })
                .run();
            }
          } catch (e) {
            console.error("Media drop upload failed", e);
          } finally {
            setUploadingSafe(false);
          }
        })();

        return true;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  // If initial doc changes (edit mode load), update the editor content once.
  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(initialDoc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const canUse = !!editor && !uploading;

  const insertImage = async (file: File) => {
    try {
      setUploadingSafe(true);
      const url = await uploadImageToSupabase(file);
      editor
        ?.chain()
        .focus()
        .insertContent({ type: "image", attrs: { src: url, alt: file.name, width: "100%" } })
        .run();
    } catch (e) {
      console.error("Image upload failed", e);
    } finally {
      setUploadingSafe(false);
    }
  };

  const insertVideo = async (file: File) => {
    try {
      setUploadingSafe(true);
      const url = await uploadVideoToSupabase(file);
      editor?.chain().focus().setVideo({ src: url, title: file.name }).run();
    } catch (e) {
      console.error("Video upload failed", e);
    } finally {
      setUploadingSafe(false);
    }
  };

  return (
    <div className="rounded-xl border bg-background flex flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b bg-secondary/20 px-3 py-2">
        <ToolbarButton
          label="B"
          active={editor?.isActive("bold")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="I"
          active={editor?.isActive("italic")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="U"
          active={editor?.isActive("underline")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          label="H2"
          active={editor?.isActive("heading", { level: 2 })}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="H3"
          active={editor?.isActive("heading", { level: 3 })}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <ToolbarButton
          label="• List"
          active={editor?.isActive("bulletList")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="1. List"
          active={editor?.isActive("orderedList")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Quote"
          active={editor?.isActive("blockquote")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          label="Link"
          disabled={!canUse}
          onClick={() => {
            const prev = editor?.getAttributes("link").href as string | undefined;
            const url = window.prompt("Link URL", prev || "https://");
            if (!url) return;
            editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
        />
        <ToolbarButton
          label="Unlink"
          disabled={!canUse}
          onClick={() => editor?.chain().focus().unsetLink().run()}
        />
        <ToolbarButton
          label="YouTube"
          disabled={!canUse}
          onClick={() => {
            const url = window.prompt("YouTube URL", "https://www.youtube.com/watch?v=");
            if (!url) return;
            const embedUrl = toYouTubeEmbedUrl(url);
            if (!embedUrl) {
              window.alert("That doesn't look like a valid YouTube link.");
              return;
            }
            editor?.chain().focus().setYoutubeVideo({ src: embedUrl, width: 640, height: 360 }).run();
          }}
        />

        <div className="ml-auto flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              if (!file) return;
              void insertImage(file);
              e.currentTarget.value = "";
            }}
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              if (!file) return;
              void insertVideo(file);
              e.currentTarget.value = "";
            }}
          />

          <button
            type="button"
            disabled={!editor || uploading}
            onClick={() => fileInputRef.current?.click()}
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading…" : "Add image"}
          </button>
          <button
            type="button"
            disabled={!editor || uploading}
            onClick={() => videoInputRef.current?.click()}
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading…" : "Add video"}
          </button>
        </div>
      </div>

      <div className="bg-background overflow-y-auto max-h-[60vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
