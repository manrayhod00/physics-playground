# 🔬 Physics Playground

A clean, colorful hub that organizes all the physics simulations **by topic**, so students,
teachers and parents can browse them in one place. Each simulation gets its own page with a short
story, a spot for a YouTube walkthrough, and a live "try it yourself" window.

---

## 🗂️ How it's organized

```
D:\simulations\
├─ index.html                 ← tiny redirect → sends visitors into the hub
├─ .nojekyll                  ← lets GitHub Pages serve every folder correctly
├─ friction\  AC\  magnetics\ …   ← your existing simulation folders (untouched)
└─ website_for_simualtions\   ← THE WEBSITE
   ├─ index.html              ← home page (topics + cards + search)
   ├─ sim.html                ← one page that shows ANY simulation (?id=…)
   ├─ data\simulations.js     ← ⭐ the master list, edit this to add videos/sims
   ├─ assets\css\style.css
   └─ assets\js\  (home.js, detail.js)
```

Nothing inside your simulation folders was moved or changed, the site just links into them.

---

## ▶️ How to add a YouTube video to a simulation

1. Open the video on YouTube and copy its **video ID**, the code after `v=` in the URL.
   Example: for `https://www.youtube.com/watch?v=dQw4w9WgXcQ` the ID is `dQw4w9WgXcQ`.
2. Open **`data/simulations.js`** and find that simulation.
3. Paste the ID into its `youtube` field:
   ```js
   youtube: 'dQw4w9WgXcQ'
   ```
4. Save and refresh. The video now appears on that simulation's page, and a **▶ Video** badge
   shows on its card. That's the only change needed.

## ➕ How to add a NEW simulation later

Add one entry to the `SIMS` list in `data/simulations.js`:
```js
{ id: 'my-new-sim', topic: 'mechanics', title: 'My New Sim',
  blurb: 'Short one-liner shown on the card.',
  story: 'A friendly paragraph shown on the detail page.',
  path: '../some_folder/my_sim.html',   // relative to the website folder
  thumb: '',                             // optional screenshot path, or leave blank for an emoji
  youtube: '' },
```
`topic` must match one of the `id`s in the `TOPICS` list at the top of the file. To add a whole new
topic, add an entry to `TOPICS` too (id, name, emoji, color).

> **Note on the `intro to vectors` folder:** its name has spaces, so in `path` they are written as
> `%20` (e.g. `../intro%20to%20vectors/dot-product/index.html`). This already works everywhere.

---

## 🚦 What's live right now

Only the **Constrained Motion Lab** is published. The switch is the first line of
`data/simulations.js`:

```js
const PUBLISHED = ['constrained-motion'];   // add ids to publish more, or use 'all'
```

Every other simulation is still in the manifest, hidden, not deleted. Topics with nothing
published are hidden automatically, so the home page stays tidy.

---

## 👤 About the author card

The "About the author" section lives directly in `index.html` (search for `id="about"`),
styled by the *About the author* block in `assets/css/style.css`. It is a two column layout:

- **Left (`.id-col`)** the `MR` monogram, the name **Manoj Rathod**, the one line role, and a
  labelled fact list (Education, Certification, Based in).
- **Right (`.bio-col`)** the three bio paragraphs.

All plain HTML, so edit any row directly. To add a fact, copy one `<li>` in `.id-list`.

---

## 🌍 Publishing to GitHub Pages (free public link)

From `D:\simulations` (the parent folder, so everything is included):

```bash
git init
git add .
git commit -m "Physics Playground: simulations hub"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Deploy from a branch →
`main` / `/ (root)` → Save.**

After a minute your site is live at:
```
https://<your-username>.github.io/<repo-name>/
```
The root redirect automatically sends visitors into the hub. Share that link with your students. 🎉

---

## 💻 Preview locally

Just double-click **`website_for_simualtions/index.html`** (or `D:\simulations\index.html`).
Everything runs as static files, no server or install needed.
