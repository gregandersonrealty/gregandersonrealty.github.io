# Reusable UI Components

Rule: component internals should not be modified. Treat these as styled building blocks; change behavior via props/usage from pages.

## Layout

- Navbar
  - Sticky site header with navigation + social links.
  - Notable props: none.

- Footer
  - Site footer with quick links, contact info, and social links.
  - Notable props: none.

## Blog

- BlogCard
  - Clickable blog post card used on Home, Blog list, and Related Posts.
  - Notable props: `post: BlogPost`, `featured?: boolean`.

## Contact / Location

- ConnectContactSection
  - Contact section/modal content with Formspree-backed message form + contact methods.
  - Notable props: `variant?: "page" | "modal"`, `showHeading?: boolean`, `title?: string`, `description?: string`, `onSuccess?: () => void`, `formId?: string`, `className?: string`.

- OfficeLocationSection
  - Office location section with embedded map + directions CTA.
  - Notable props: `title?: string`, `className?: string`.

## Rich Content Rendering

- TiptapEditor
  - Admin post body editor (uploads images/videos to Supabase storage).
  - Notable props: `initialDoc: JSONContent`, `onChange: (doc) => void`, `onUploadStateChange?: (uploading) => void`.

- TiptapRenderer
  - Renders stored Tiptap JSON content on the public blog post page.
  - Notable props: `doc: JSONContent`.

- EditorJsRenderer
  - Renders stored Editor.js output (legacy/alternate post body format).
  - Notable props: `data: EditorJsOutput`.

## Icons

- MediumIcon, SubstackIcon
  - Lightweight SVG icons used in Navbar/Footer/About social link rows.
  - Notable props: `className?: string`.
