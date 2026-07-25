# ➕ How to Add a New Simulation

Everything on the site is driven by **one file**:

```
website_for_simualtions/data/simulations.js
```

You never edit HTML. Add a few lines to that file, refresh the page, done. This guide shows exactly how.

---

## ⚡ Quick version (3 steps)

1. Put your simulation's HTML file somewhere under `D:\simulations\` (e.g. a new folder `D:\simulations\waves\wave.html`).
2. Open `data/simulations.js` and add **one entry** to the `SIMS` list (copy the template below).
3. Save and refresh the home page. Your simulation now shows up as a card and gets its own page automatically.

---

## 📋 Copy-paste template

Paste this inside the `SIMS = [ ... ]` list (add a comma after the entry above it):

```js
{ id: 'my-sim-id', topic: 'mechanics', grade: 11, title: 'My Simulation Title',
  blurb: 'One short line shown on the card.',
  story: 'A friendly paragraph shown on the simulation\'s page. Explain what to try.',
  path: '../folder_name/my_sim.html',
  thumb: '',
  youtube: '' },
```

Then fill in each field:

| Field | What to put | Notes |
|-------|-------------|-------|
| `id` | A unique short name, lowercase-with-dashes, e.g. `'wave-motion'` | **Must be unique.** This becomes the page link `sim.html?id=wave-motion`. |
| `topic` | Which topic group it belongs to | **Must match** one of the topic IDs listed below. |
| `grade` | `10`, `11` or `12` | Which grade dropdown it lands in. A number, no quotes. |
| `title` | The name students see | e.g. `'Wave Motion'` |
| `blurb` | One-line teaser on the card | Keep it under ~12 words. |
| `story` | A paragraph on the sim's own page | Explain what to explore. Optional, if blank, the blurb is used. |
| `path` | Where the sim file is, **relative to the website folder** | Almost always starts with `../` (one level up). See below. |
| `thumb` | Path to a screenshot for the card, or `''` | Leave `''` to get a colorful emoji placeholder instead. |
| `youtube` | A YouTube video ID, or `''` | Leave `''` for now, add later (see bottom). |

---

## 🗂️ Available topic IDs

Use one of these exact values for `topic`:

| `topic` value | Shows under |
|---------------|-------------|
| `mechanics` | ⚙️ Mechanics |
| `vectors` | ➡️ Vectors |
| `ac-circuits` | 🔌 AC Circuits |
| `electricity` | ⚡ Electricity |
| `electrostatics` | 🧲 Electrostatics |
| `magnetism` | 🌀 Magnetism |
| `optics` | 🔭 Optics |

Want a **brand-new topic** (e.g. "Waves")? See the last section.

---

## 🎓 Grades: the top level of the site

The home page shows one dropdown per grade, and each grade holds the topic
groups that have something in it. A simulation picks its grade with `grade:`.

| `grade` value | Shows under |
|---------------|-------------|
| `10` | GRADE 10 |
| `11` | GRADE 11 |
| `12` | GRADE 12 |

The same topic may appear under more than one grade (Mechanics in Grade 11 and
Grade 12, say) — each grade only lists its own simulations. A grade with nothing
published still shows, saying its simulations are on the way.

---

## 🧹 After publishing: bump the cache version

Browsers hold on to `simulations.js` for a while, so a freshly published
simulation can be invisible for several minutes. Every local script and
stylesheet is loaded with a `?v=...` tag:

```html
<script src="data/simulations.js?v=2026-07-26a"></script>
```

**When you publish, change that tag to today's date** (in both `index.html`
and `sim.html`, all references). Every reader then gets the new manifest
immediately instead of yesterday's copy.

---

## 🧭 Getting the `path` right

`path` is written **relative to the `website_for_simualtions` folder**, so it starts with `../` to step up into `D:\simulations\`.

| Your simulation file | What to write for `path` |
|----------------------|--------------------------|
| `D:\simulations\waves\wave.html` | `'../waves/wave.html'` |
| `D:\simulations\optics\lens\index.html` | `'../optics/lens/index.html'` |
| `D:\simulations\heat\thermo.html` | `'../heat/thermo.html'` |

**Folders with spaces:** replace each space with `%20`.
Example: a file in `D:\simulations\intro to vectors\...` is written as
`'../intro%20to%20vectors/draw-a-vector/index.html'`.
(Tip: to avoid this, name new folders with `_` or `-` instead of spaces.)

---

## 🖼️ Adding a thumbnail (optional)

- If you have a screenshot, drop it next to your sim and point `thumb` at it, e.g.
  `thumb: '../waves/preview.png'`.
- If you leave `thumb: ''`, the card automatically shows the topic's emoji on a colored gradient, which looks clean and consistent, so this is totally fine to skip.

---

## ✅ Full worked example

Say you made a new simulation at `D:\simulations\waves\transverse.html` about waves.
First it needs a topic, "Waves" doesn't exist yet, so add it to `TOPICS` (top of the file):

```js
{ id: 'waves', name: 'Waves', emoji: '🌊', color: '#3ec8ff',
  tagline: 'Ripples, wavelength and the speed of a disturbance.' },
```

Then add the simulation to `SIMS`:

```js
{ id: 'transverse-wave', topic: 'waves', title: 'Transverse Waves',
  blurb: 'Watch a pulse travel while the medium stays put.',
  story: 'Send a pulse down the string and see each point move up and down, never sideways. Change the tension and frequency to explore wave speed and wavelength.',
  path: '../waves/transverse.html',
  thumb: '',
  youtube: '' },
```

Save, refresh `index.html` → a new **🌊 Waves** section appears with your card, and clicking it opens the running simulation with prev/next navigation. That's it.

---

## 🎬 Adding a YouTube video (any time)

1. Copy the video's **ID**, the part after `v=` in the URL.
   `https://www.youtube.com/watch?v=`**`dQw4w9WgXcQ`** → ID is `dQw4w9WgXcQ`.
2. In that simulation's entry, set:
   ```js
   youtube: 'dQw4w9WgXcQ'
   ```
3. Save, refresh. The video now plays on the simulation's page, and a **▶ Video** badge appears on its card.

---

## 🚦 Choosing what is LIVE on the site (the `PUBLISHED` switch)

At the very top of `data/simulations.js` there is one line that controls what visitors actually see:

```js
const PUBLISHED = ['constrained-motion'];
```

- Only the simulation **ids** in this list appear on the home page and open on `sim.html`.
  Everything else stays in the manifest, untouched, just hidden.
- A topic with nothing published disappears from the chips and sections automatically,
  no other file needs editing.
- To publish another one, add its id:
  ```js
  const PUBLISHED = ['constrained-motion', 'friction-lab'];
  ```
- To put the whole library back online at once:
  ```js
  const PUBLISHED = 'all';
  ```
- Someone who has an old link to a hidden simulation just gets the friendly
  “Simulation not found” page.

---

## ⚠️ Common mistakes

- **Forgot the comma** between entries → the page goes blank. Every `{ ... }` in the list needs a comma after it (except the last one is fine either way).
- **Duplicate `id`** → the second one won't open. Keep every `id` unique.
- **`topic` doesn't match** any topic ID → the card won't appear. Check spelling against the table above.
- **Wrong `path`** → the sim page shows an empty frame. Open the sim file directly in your browser and match the folder names exactly (remember `%20` for spaces).

---

## 👀 Preview before publishing

Just double-click `website_for_simualtions/index.html` (or `D:\simulations\index.html`). No server needed, it all runs as plain files. When you're happy, follow the publishing steps in `README.md` to push to GitHub Pages.
