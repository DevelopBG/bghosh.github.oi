# Banibrata Ghosh · portfolio

Personal portfolio site: ML research, LLM engineering, publications and experience.

Plain HTML, CSS and JavaScript with no build step, served by GitHub Pages.

```
index.html             all page content
assets/css/style.css   styles (dark theme + light theme + print)
assets/js/main.js      nav, scroll effects, project modals, filters
assets/images/         project figures and screenshots
```

## Preview locally

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

then visit http://localhost:8000.

## Editing

- **New project:** copy an `<article class="card project-card">` block in `#projects` and its matching `<dialog class="modal">` at the bottom of `index.html`; point the card's `data-modal` at the dialog's `id`.
- **New publication:** copy an `<article class="card pub">` block. Set `data-cat` to `ml` or `eng`.
- **Profile photo:** in the hero, replace the `BG` initials with `<img src="assets/images/profile.jpg" alt="Banibrata Ghosh">`.
