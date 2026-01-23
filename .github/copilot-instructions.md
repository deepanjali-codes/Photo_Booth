<!-- Copilot instructions for this multi-mini-site workspace -->
# Copilot instructions — workspace-specific guidance

Purpose
- Help an AI coding assistant make small, safe, and high-value changes across this workspace of independent mini-projects.

Big picture
- Top-level folders are independent static projects (examples: `ANIME/`, `Cake_Aesthetics/`, `coding-space/`, `Minecraft/`, `python/`).
- Each project is a plain HTML/CSS/JS site or a collection of small Python scripts — there is no shared build system, no package.json, and no back-end services.

Key patterns & examples
- Files are usually named `index.html`, `style.css`, and `script.js` inside each project folder (see `Minecraft/index.html` and `Minecraft/script.js`).
- DOM and data-attribute patterns: `Cake_Aesthetics/menu_script.js` uses `data-info` and dynamic creation/removal of `.info` nodes. Preserve `data-*` attributes and existing class names when modifying behaviour.
- Navigation / hash handling: several pages use hash anchors plus JS smooth-scrolling (see `Minecraft/script.js`) — maintain anchor semantics and update corresponding `id` targets if you rename anchors.
- Assets are often external URLs; when adding local assets, place them inside the same project folder and use relative paths.

Developer workflows (how to preview & run)
- No build step. To preview a site, open its `index.html` in a browser or run a simple static server from the workspace root:
  - Windows: `cd "C:\Coding 🤖"` then `py -m http.server 8000` (open http://localhost:8000)
  - Or from a project folder: `py -m http.server 8000` and browse to `http://localhost:8000/<FolderName>/`.
- Run Python scripts with `py <path>` or `python <path>` (e.g., `py python\07_loop.py`). Quote paths when they include spaces or emoji.

Project-specific conventions
- Keep changes localized to a single folder unless you intentionally refactor shared assets.
- Prefer vanilla JS/CSS; do not introduce bundlers or transpilers without explicit approval.
- Respect existing naming: `index.html`, `style.css`, `script.js`. Many pages reference these exact names.

Integration & dependencies
- There are no third-party package manifests. External integrations are primarily image URLs and CDN links inside HTML.
- If a change introduces a new dependency (npm, pip), document why and add a minimal manifest (`package.json` or `requirements.txt`) and exact reproduction steps.

Editing guidance for AI agents
- Make minimal, reviewable commits scoped to one feature/bugfix per folder.
- Update relative links and test in the browser (or local `http.server`) to confirm no broken anchors or missing assets.
- When changing JS that manipulates DOM classes/IDs, update all HTML/CSS references in the same folder.
- Avoid changing global structure (adding a site-wide build step or moving folders) without user confirmation.

PR checklist
- One logical change per PR.
- Manual smoke test: open `index.html` in the modified folder and verify primary interactions (navigation, buttons, forms) still work.
- Add a short PR description referencing edited files and manual test steps.

Contact / context
- The repository owner information appears in `coding-space/README.md` (author/contacts). Ask there or open a PR for clarification.

If anything here is unclear or you want the instructions tuned (more/less strict, allow toolchain), tell me which areas to update.
