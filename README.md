# sobecker.github.io

Personal website of Sophia Becker. Plain HTML + CSS, no build step:
whatever is in this repository is exactly what is online.

## Files

| File | What it contains |
|---|---|
| `index.html` | Home: photo, bio, profile links, news |
| `research.html` | Featured paper, research cards, publication list |
| `cv.html` | Web CV |
| `contact.html` | Email and profile links |
| `css/style.css` | All colors, fonts and layout (colors & fonts at the top) |
| `js/main.js` | Draws the curves and placeholder figures (rarely needs editing) |
| `images/` | Photo and figures |
| `cv.pdf` | Downloadable CV |

## Images to add (same file names = no code change needed)

| File | Where it appears | Suggested size |
|---|---|---|
| `images/photo.jpg` | Home, portrait | square, ~600×600 px |
| `images/fig-featured.png` | Research, featured paper (Neuron 2026) | ~520×380 px |
| `images/fig-novelty.png` | Research card: Novelty | ~800×380 px |
| `images/fig-curiosity.png` | Research card: Curiosity | ~800×380 px |
| `images/fig-working-memory.png` | Research card: Working memory | ~800×380 px |
| `images/fig-next.png` | Research card: Next project | ~800×380 px |

Until a file exists, a drawn placeholder is shown instead.
To delete the small "replace: …" labels, remove the `<span class="note">…</span>` lines in `research.html`.

## Common edits

- **Text:** open the `.html` file, change the words between the tags.
- **News item:** in `index.html`, copy one `<div class="news-item">` line and paste it at the top of the list.
- **Publication:** in `research.html`, copy one `<div class="pub">` block.
- **Colors:** change `--accent`, `--bg` etc. at the top of `css/style.css`.
- **Menu:** the header is copied in all four `.html` files; change it in each.

## Preview locally

Double-click `index.html` — it opens in your browser exactly as it will look online.
