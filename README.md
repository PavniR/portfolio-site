# Pavni Rastogi - Portfolio Site

Plain HTML/CSS/JS. No build step, no dependencies. Works directly on GitHub Pages.

## Folder structure

```
portfolio-site/
├── index.html              ← homepage
├── styles.css               ← homepage + shared design tokens
├── script.js                 ← homepage behavior (hero typing, reveals, counters)
├── project.css               ← case-study page styles (extends styles.css)
├── project.js                 ← case-study page behavior (nav + reveals)
├── assets/
│   └── Pavni_Rastogi_Resume.pdf   ← ADD YOUR RESUME HERE
└── projects/
    ├── supply-chain-dashboard.html
    ├── customer-churn-prediction.html
    ├── product-analytics-dashboard.html
    └── marketing-funnel-analysis.html
```

Every case-study page loads `../styles.css` and `../project.css` (going *up* from
`projects/` to the root), and the homepage links *down* into `projects/…html`.
Don't split this into separate folders per page — everything shares one
stylesheet and script on purpose, so keep this exact structure.

## Before publishing

1. Drop your real resume PDF into `assets/` and confirm the filename matches
   `Pavni_Rastogi_Resume.pdf` (or update the links in `index.html` and every
   file in `projects/` if you rename it).
2. Replace every `yourusername` GitHub link and `pavni.rastogi@example.com`
   placeholder with your real ones (find-and-replace across all files).
3. Replace the `placehold.co` dashboard preview images with real screenshots
   once you have them — same `<img>` tags, just swap the `src`.

## Run locally

From inside `portfolio-site/`:

```
python -m http.server 8000
```

then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push this whole folder's contents to the root of your GitHub repo
   (or to a `docs/` folder, and point Pages at that).
2. In the repo: Settings → Pages → set source to the branch/folder above.
3. Your site will be live at `https://yourusername.github.io/repo-name/`.
