# Page Routes

Routing is defined in client/src/App.tsx using Wouter.

## Global App Shell (applies to all routes)

- QueryClientProvider (React Query)
- TooltipProvider
- Toaster
- Router (base path derived from `import.meta.env.BASE_URL` in prod)
- ScrollToTop

## Routes (from client/src/App.tsx)

### /
- Page: Home (client/src/pages/Home.tsx)
- Purpose: Homepage hero + “Let’s Connect” modal + latest content + credibility sections.
- Component order (top-level):
  - Navbar
  - Main
    - Hero section
    - Dialog (Let’s Connect)
      - ConnectContactSection (variant="modal")
    - Latest Content
      - BlogCard x3 (featuredPosts)
    - Why Choose Me
    - Personal Introduction
    - Stats Bar
  - Footer

### /blog
- Page: Blog (client/src/pages/Blog.tsx)
- Purpose: Blog listing with search + category filter and featured post.
- Component order (top-level):
  - Navbar
  - Main
    - Header section
      - Search input
      - Category select
    - Posts section
      - BlogCard (featuredPost, featured)
      - BlogCard grid (remainingPosts)
  - Footer

### /blog/:id
- Page: BlogPost (client/src/pages/BlogPost.tsx)
- Purpose: Single post detail page with body rendering + related posts.
- Component order (top-level):
  - Navbar
  - Main
    - Back link
    - Article
      - Badge (category)
      - Featured media (conditional `post.image`)
      - Body renderer (one of):
        - TiptapRenderer (when Tiptap content exists)
        - EditorJsRenderer (when Editor.js content exists)
    - Related posts section (optional)
      - BlogCard x2
  - Footer

### /about
- Page: About (client/src/pages/About.tsx)
- Purpose: Office/location section + contact section + social links + podcast CTA.
- Component order (top-level):
  - Navbar
  - Main
    - OfficeLocationSection
    - ConnectContactSection
    - Social icon links row
    - Podcast CTA link
  - Footer

### /admin
- Page: Admin (client/src/pages/Admin.tsx)
- Purpose: Admin sign-in/out and manage posts + categories.
- Component order (top-level):
  - Navbar
  - Main
    - Auth panel (sign-in vs logged-in state)
    - Category manager
    - Posts list
  - Footer

### /admin/add
- Page: AddPost (client/src/pages/AddPost.tsx)
- Purpose: Create a new post (title/excerpt/body via TiptapEditor, settings, featured image).
- Component order (top-level):
  - Navbar
  - Main
    - Post form
      - TiptapEditor
    - Sidebar settings (category/type/featured image)
  - Footer

### /admin/edit/:id
- Page: AddPost (client/src/pages/AddPost.tsx)
- Purpose: Edit an existing post (same UI as /admin/add, prefilled from Supabase).
- Component order: same as /admin/add

### Catch-all (not matched)
- Page: NotFound (client/src/pages/not-found.tsx)
- Purpose: 404 page.
- Component order (top-level):
  - UI Card (from components/ui)
  - Note: does not include Navbar/Footer.
