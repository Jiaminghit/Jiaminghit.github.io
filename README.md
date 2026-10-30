# Jiaming Yang · 杨佳明

A bilingual personal homepage for research in 3D vision and experience in data engineering.

- 中文: https://jiaminghit.github.io/
- English: https://jiaminghit.github.io/en/
- Content baseline: finalized Chinese and English résumé, 30 October 2026.

## Editing

The website is static HTML, CSS and JavaScript, with no runtime dependencies, analytics, remote fonts or third-party scripts. Both language versions remain readable with JavaScript disabled.

| File | Purpose |
| --- | --- |
| `data/resume.json` | Authoritative bilingual education, work, research, teaching and skills content |
| `scripts/build.mjs` | Page templates, translated interface labels, biography and metadata |
| `assets/css/home.css` | Responsive visual design |
| `assets/js/home.js` | Mobile navigation, section highlighting, language links and email copying |
| `assets/files/resume-zh.pdf` | Chinese résumé |
| `assets/files/resume-en.pdf` | English résumé |
| `assets/files/curriculum_vitae.pdf` | Bilingual résumé; retains the original download URL |

Update the content and PDF files together. Preserve the distinction between proxy metrics and ground-truth accuracy, and retain the reference-scale qualification on reconstruction results. Do not reintroduce the old template's example publications.

```sh
node scripts/build.mjs
node scripts/check.mjs
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/` and `/en/`. Check desktop and narrow mobile layouts, both language links, expandable details and PDF downloads. Commit the generated `index.html`, `en/index.html` and `sitemap.xml` together with source changes.

## Deployment

GitHub Pages serves the `main` branch from the repository root. `.nojekyll` disables the previous Jekyll template pipeline; no Ruby, package installation or custom GitHub Actions workflow is needed. A push to `main` triggers the repository's Pages deployment. The source image is retained; the page serves a small WebP derivative.

The previous site is retained in Git history and on the local branch `backup/pre-resume-refresh-20261030`. The original CC0 license remains in `LICENSE`.
