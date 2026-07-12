# Portfolio starter

A single-page portfolio site: research, software, hardware, and photography, linked from your CV. Plain HTML/CSS/JS — no build step, no framework, nothing to install.

## Files

```
index.html      all page content
style.css       all styling
script.js       mobile nav toggle (that's the only JS on the page)
assets/         put your own images here (empty placeholders for now)
```

## Before you publish

1. **Swap the placeholders.** The hardware and photography sections have dashed-border placeholder cards. Replace them with real `<img>` tags pointing at files in `/assets/hardware` and `/assets/photography`.
2. **Fix the GitHub links.** Right now `Moosic` and the "other repositories" card both point at `github.com/eozil`. Once specific repos are public, point each card at its own repo URL instead.
3. **3D models (optional).** For an interactive 3D viewer of PCB or printed parts, upload the model to [Sketchfab](https://sketchfab.com) (free tier is enough) and drop their `<iframe>` embed code in place of the third placeholder card in the hardware section.
4. Double check the paper link still resolves — it's a DOI (`doi.org/...`), which shouldn't ever break, but worth a click.

## Publishing to GitHub Pages

You have two options. Both are free and need nothing beyond a GitHub account.

### Option A — a site at `yourusername.github.io` (recommended)

1. On GitHub, create a new repository named **exactly** `yourusername.github.io` (replace with your actual username, e.g. `eozil.github.io`).
2. Push these three files (and `assets/`) to the root of that repository — no subfolder.
3. Go to the repo's **Settings → Pages**. Under "Build and deployment," set Source to "Deploy from a branch," branch `main`, folder `/ (root)`. Save.
4. Wait a minute or two, then visit `https://yourusername.github.io` — it's live.

### Option B — a project page under an existing repo

1. Push these files to any repo, e.g. inside a folder called `portfolio` or at the repo root.
2. Settings → Pages → Source → deploy from branch `main`, folder `/ (root)` or `/docs` depending on where you put the files.
3. Your site publishes at `https://yourusername.github.io/repo-name`.

Option A gives you the clean root URL; Option B is better if this is meant to live alongside other project repos.

## Adding a custom domain (optional)

If you buy a domain (Namecheap, Cloudflare, Google Domains, etc., roughly $10–15/year):

1. Add a file named `CNAME` (no extension) to the repo root containing just your domain, e.g. `eminhanozil.com`.
2. At your domain registrar, add a `CNAME` record pointing your domain (or `www`) at `yourusername.github.io`. For an apex domain (`eminhanozil.com` with no `www`), instead add four `A` records pointing at GitHub's Pages IPs — GitHub's own docs list the current IPs under "Managing a custom domain."
3. Back in Settings → Pages, enter the custom domain and enable "Enforce HTTPS" once it's available (can take a few hours after DNS propagates).

## Local preview

No server needed — just open `index.html` directly in a browser. If you want a local server (some browsers restrict local file access for certain features): `python3 -m http.server` from this folder, then visit `http://localhost:8000`.
