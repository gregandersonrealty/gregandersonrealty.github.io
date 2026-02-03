import Image from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/core";

function sanitizeSize(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const v = raw.trim();
  if (!v) return null;

  // Allow percentages and pixel values only.
  if (/^\d{1,3}%$/.test(v)) return v;
  if (/^\d{1,4}px$/.test(v)) return v;
  return null;
}

function sanitizeFloat(raw: unknown): "left" | "right" | null {
  if (raw === "left" || raw === "right") return raw;
  return null;
}

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-width") || el.style.width || null,
        renderHTML: (attrs) => {
          const width = sanitizeSize(attrs.width);
          return width ? { "data-width": width } : {};
        },
      },
      float: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-float") || null,
        renderHTML: (attrs) => {
          const float = sanitizeFloat(attrs.float);
          return float ? { "data-float": float } : {};
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const width = sanitizeSize((HTMLAttributes as any).width);
    const float = sanitizeFloat((HTMLAttributes as any).float);

    // Keep styles minimal/safe; let Tailwind/prose handle the rest.
    const styleParts: string[] = [];
    if (width) styleParts.push(`width:${width}`);
    if (float) styleParts.push(`float:${float}`);
    if (float) {
      // Give wrapped text some breathing room.
      if (float === "left") styleParts.push("margin:0.5rem 1.25rem 0.5rem 0");
      if (float === "right") styleParts.push("margin:0.5rem 0 0.5rem 1.25rem");
    }

    const style = styleParts.length ? styleParts.join(";") : undefined;

    // Remove our internal-only keys so they don't become invalid HTML attributes.
    const { width: _w, float: _f, style: existingStyle, ...rest } = HTMLAttributes as any;

    return [
      "img",
      mergeAttributes(rest, {
        style: [existingStyle, style].filter(Boolean).join(";") || undefined,
      }),
    ];
  },
});
