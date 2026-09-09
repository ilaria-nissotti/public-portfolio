# public-portfolio

Personal portfolio site for Ilaria Nissotti-Revel — MSc Data Science student at UZH.

Plain HTML/CSS/JS, no build step, ready to deploy on GitHub Pages.

## Structure

- `index.html` — page content and structure
- `styles.css` — dark, minimal theme with teal/violet accents and monospace touches
- `script.js` — scroll-reveal animations, typewriter effect, nav behavior
- `assets/` — drop your CV PDF here (see `assets/README.md`)

## Preview locally

Just open `index.html` in a browser, or serve it:

```
npx serve .
```

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, go to **Pages** and set the source to the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## To do

- [ ] Add `assets/Ilaria-Nissotti-Revel-CV.pdf`
- [ ] Fill in project write-ups / links / images (Cell Segmentation Tracking, Wikidata,
      Meta-Controller, Informfully, RiskON) in the Projects section of `index.html`
- [ ] Add paper/GitHub links for "When Do LLMs Know What They Know?"
- [ ] Optional: swap the About section's terminal graphic for a real photo
