import { useEffect, useMemo, useRef } from "react";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function sanitizeSize(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const v = raw.trim();
  if (!v) return null;
  if (/^\d{1,3}%$/.test(v)) return v;
  if (/^\d{1,4}px$/.test(v)) return v;
  return null;
}

export function ResizableImageNodeView({ node, editor, selected, updateAttributes }: NodeViewProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<null | {
    startX: number;
    startWidthPx: number;
    containerWidthPx: number;
  }>(null);

  const width = useMemo(() => sanitizeSize((node.attrs as any)?.width) || "100%", [node.attrs]);
  const float = (node.attrs as any)?.float === "left" || (node.attrs as any)?.float === "right" ? (node.attrs as any).float : null;

  const wrapperStyle: React.CSSProperties = useMemo(() => {
    const style: React.CSSProperties = { width };
    if (float) {
      style.float = float;
      style.margin = float === "left" ? "0.5rem 1.25rem 0.5rem 0" : "0.5rem 0 0.5rem 1.25rem";
    }
    return style;
  }, [width, float]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const drag = dragStateRef.current;
      if (!drag) return;

      const dx = e.clientX - drag.startX;
      const nextWidthPx = clamp(drag.startWidthPx + dx, 160, drag.containerWidthPx);
      const pct = clamp((nextWidthPx / drag.containerWidthPx) * 100, 20, 100);
      updateAttributes({ width: `${Math.round(pct)}%` });
    };

    const onUp = () => {
      if (dragStateRef.current) dragStateRef.current = null;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [updateAttributes]);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const wrapperEl = wrapperRef.current;
    if (!wrapperEl) return;

    const containerWidthPx = editor?.view?.dom?.getBoundingClientRect().width ?? wrapperEl.parentElement?.getBoundingClientRect().width ?? 0;
    const startWidthPx = wrapperEl.getBoundingClientRect().width;

    dragStateRef.current = {
      startX: e.clientX,
      startWidthPx,
      containerWidthPx: containerWidthPx || startWidthPx,
    };
  };

  const src = typeof (node.attrs as any)?.src === "string" ? (node.attrs as any).src : "";
  const alt = typeof (node.attrs as any)?.alt === "string" ? (node.attrs as any).alt : "";

  return (
    <NodeViewWrapper as="div" ref={wrapperRef} style={wrapperStyle} className="my-4">
      <div
        className={
          "group relative rounded-xl border bg-background overflow-hidden " +
          (selected ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : "")
        }
      >
        <img src={src} alt={alt} className="block w-full h-auto" draggable={false} />

        {/* Quick controls */}
        {selected ? (
          <div className="absolute left-2 top-2 flex flex-wrap items-center gap-2 rounded-lg border bg-background/95 px-2 py-1 shadow-sm">
            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() => updateAttributes({ float: "left", width: sanitizeSize(width) ? width : "50%" })}
                className={
                  "rounded-md border px-2 py-0.5 text-xs cursor-pointer " +
                  (float === "left" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary")
                }
                title="Wrap text on the right"
              >
                Wrap L
              </button>
              <button
                type="button"
                onClick={() => updateAttributes({ float: "right", width: sanitizeSize(width) ? width : "50%" })}
                className={
                  "rounded-md border px-2 py-0.5 text-xs cursor-pointer " +
                  (float === "right" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary")
                }
                title="Wrap text on the left"
              >
                Wrap R
              </button>
              <button
                type="button"
                onClick={() => updateAttributes({ float: null })}
                className={
                  "rounded-md border px-2 py-0.5 text-xs cursor-pointer " +
                  (!float ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary")
                }
                title="No text wrap"
              >
                No wrap
              </button>
            </div>

            <div className="h-5 w-px bg-border/70" />

            <button
              type="button"
              onClick={() => updateAttributes({ width: "100%", float: null })}
              className="rounded-md border px-2 py-0.5 text-xs cursor-pointer bg-background hover:bg-secondary"
              title="Reset to full width"
            >
              Full width
            </button>
          </div>
        ) : null}

        {/* Resize handle (drag) */}
        <button
          type="button"
          onMouseDown={startResize}
          className={
            "absolute bottom-2 right-2 h-4 w-4 rounded-sm border bg-background/90 shadow-sm " +
            "opacity-0 group-hover:opacity-100 transition-opacity cursor-se-resize"
          }
          aria-label="Resize image"
          title="Drag to resize"
        />

      </div>
    </NodeViewWrapper>
  );
}
