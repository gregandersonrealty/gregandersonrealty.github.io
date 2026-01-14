Admin-managed Blog Posts

This project supports an admin-managed blog where creating, editing, and deleting posts via the Admin UI will update `server/data/posts.json` and attempt to commit/push the change to the repo (so the site updates for everyone).

Quick Start (local)

1. Start the server with an ADMIN_TOKEN (used to authenticate admin actions):
   - Windows PowerShell: $env:ADMIN_TOKEN='your-secret'; npm run dev
   - macOS/Linux: export ADMIN_TOKEN='your-secret' && npm run dev

2. Open the site (default port 5000) and go to /admin. Paste the same token into the Admin token field, then click Add Post.

Notes
- The server will try to commit and push `server/data/posts.json` and `server/data/categories.json`. You must configure git credentials on the server (SSH key or remote with token) for pushes to succeed.
- If the git push fails the change is still saved locally and the API will return `pushed: false`.

Security
- ADMIN_TOKEN is a minimal approach. The Admin UI is not linked publicly; access the admin panel at `/admin` by URL and sign in with the token. For production, add proper authentication and HTTPS.

If you'd like, I can:
- Add edit / preview features in the Admin UI.
- Add server-side authentication (username/password + sessions) and an audit log.
- Create a protected GitHub workflow (e.g., create a PR instead of pushing directly) so changes are reviewed.
