Admin API and Git-backed Posts

Overview
- Server exposes a simple admin API for managing blog posts and persists them to `server/data/posts.json`.
- When an admin creates/edits/deletes a post the server attempts to `git add`, `git commit` and `git push` the updated file so the repo is updated on GitHub.

Environment
- ADMIN_TOKEN (required): a secret token used to authorize admin operations. Example:
  - Windows (powershell): $env:ADMIN_TOKEN='your-secret'
  - Linux/macOS: export ADMIN_TOKEN='your-secret'

Security
- The admin endpoints are protected by the `Authorization: Bearer <ADMIN_TOKEN>` header. Keep `ADMIN_TOKEN` secret.
- This is a minimal authentication approach. For production consider adding stronger authentication + HTTPS and IP restrictions.

Git Push Notes
- The server uses the repo's local git config to commit and push. Ensure the server process has permission to push to the remote:
  - Configure SSH keys for the user running the server (recommended): add an SSH deploy key with push access on GitHub, and ensure `ssh-agent` or an SSH key is available in the environment.
  - Or set a remote that includes a GitHub token in the URL (`https://<GITHUB_TOKEN>@github.com/owner/repo.git`) — don't commit tokens to disk.
- If `git commit` or `git push` fails, the API will still return a response with `pushed: false` and the post changes will remain in `server/data/posts.json` locally.

API Endpoints
- GET /api/posts
  - Returns the posts array (public).

- GET /api/categories
  - Returns the list of categories (public).

- POST /api/admin/validate
  - Headers: Authorization: Bearer <ADMIN_TOKEN> OR { token }
  - Validates the admin token and returns 200 if valid.

- POST /api/admin/posts
  - Headers: Authorization: Bearer <ADMIN_TOKEN>
  - Body: JSON partial of post, e.g. { title, excerpt, category, type, image }
  - Server will generate `id` and `date` and add the post to the start of the list.

- PUT /api/admin/posts/:id
  - Headers: Authorization: Bearer <ADMIN_TOKEN>
  - Body: JSON partial fields to update

- DELETE /api/admin/posts/:id
  - Headers: Authorization: Bearer <ADMIN_TOKEN>

- POST /api/admin/categories
  - Headers: Authorization: Bearer <ADMIN_TOKEN>
  - Body: { name }

- PUT /api/admin/categories/:name
  - Headers: Authorization: Bearer <ADMIN_TOKEN>
  - Body: { newName } - renames the category and updates posts using it

- DELETE /api/admin/categories/:name
  - Headers: Authorization: Bearer <ADMIN_TOKEN>
  - Deletes a category and sets posts that used it to "Uncategorized"

Client Usage
- The client UI provides an Admin page at `/admin` where you can paste the `ADMIN_TOKEN` (saved to sessionStorage) to perform actions.
- Add Post UI posts to `/api/admin/posts` and on success the server attempts to push the change to GitHub.

Troubleshooting
- If `git push` fails because of authentication, follow GitHub's guidance to set up an SSH deploy key or Personal Access Token for the server account.
- Check server logs for `Git commit/push failed:` messages.

Limitations & Next Steps
- The system uses a simple token for admin auth. For multi-admin environments you may want user accounts and session-based auth.
- Consider adding audit logging, automated PR creation instead of direct push, or previewing changes before pushing.
