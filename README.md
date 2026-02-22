# 🏡 Carver County Real Estate Platform

A modern, data-driven real estate website focused on hyperlocal market insights, long-form blog content, and community-driven housing analysis for Carver County, Minnesota.

This platform combines high-performance frontend delivery with a structured Supabase backend to manage blog posts, categories, and market content.

---

## 🚀 Tech Stack

### Frontend
- **Next.js** – React framework for SSR/SSG and performance optimization  
- **React** – Component-based UI architecture  
- **TypeScript** – Type safety and maintainability  
- **Tailwind CSS** – Utility-first styling  
- **Responsive Design** – Optimized for desktop, tablet, and mobile  

### Backend / Infrastructure
- **Supabase**
  - PostgreSQL database
  - REST API via PostgREST
  - Row Level Security (RLS)
  - Foreign key relationships
  - Indexed queries for performance

- **PostgreSQL**
  - UUID primary keys
  - Foreign key constraints
  - Indexed composite queries
  - Structured relational schema

### Hosting & Deployment
- Hosted frontend (e.g., Vercel or similar platform)
- Supabase managed backend
- CDN-backed image delivery

---

## 🗄 Database Architecture

### `posts` Table

| Column        | Type        | Details |
|--------------|------------|----------|
| id           | UUID       | Primary key (`gen_random_uuid()`) |
| title        | text       | Not null |
| slug         | text       | Unique |
| excerpt      | text       | Nullable |
| content      | text       | Blog body |
| image        | text       | Default `/remax_logo.png` |
| read_time    | text       | Default `5 min read` |
| category_id  | UUID       | Foreign key → `categories(id)` |
| published    | boolean    | Default `true` |
| created_at   | timestamp  | Default `now()` |
| updated_at   | timestamp  | Default `now()` |

---

### `categories` Table

| Column | Type | Details |
|--------|------|----------|
| id     | UUID | Primary key |
| name   | text | Unique |
| slug   | text | Unique |

