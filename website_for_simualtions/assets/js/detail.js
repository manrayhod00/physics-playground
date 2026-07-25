/* Renders a single simulation's detail page from ?id=... in the URL. */
(function () {
  const TOPICS = window.TOPICS || [];
  const SIMS = window.SIMS || [];
  const root = document.getElementById('detail');

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  const id = new URLSearchParams(location.search).get('id');
  const sim = SIMS.find(s => s.id === id);

  if (!sim) {
    root.innerHTML = `
      <div style="text-align:center;padding:80px 0">
        <div style="font-size:64px">🧭</div>
        <h1 style="margin:10px 0">Simulation not found</h1>
        <p style="color:var(--ink-soft);margin-bottom:22px">We couldn't find that one. Let's head back home.</p>
        <a class="btn btn-primary" href="index.html">← Back to all simulations</a>
      </div>`;
    return;
  }

  const topic = TOPICS.find(t => t.id === sim.topic) || { name: '', emoji: '🔬', color: '#7c5cff' };
  root.style.setProperty('--accent', topic.color);
  document.title = sim.title + ' | Physics Playground';

  // Prev / next within the same topic
  const siblings = SIMS.filter(s => s.topic === sim.topic);
  const idx = siblings.findIndex(s => s.id === sim.id);
  const prev = siblings[idx - 1];
  const next = siblings[idx + 1];

  // YouTube block: rendered only when an ID is set. With no video we skip the
  // whole section (label included) rather than leaving an empty placeholder.
  const videoBlock = sim.youtube
    ? `<div class="panel-label">🎥 Watch &amp; understand</div>
       <div class="video-frame">
         <iframe src="https://www.youtube-nocookie.com/embed/${esc(sim.youtube)}"
                 title="${esc(sim.title)} video" allowfullscreen
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
       </div>`
    : '';

  const pagerLink = (s, cls, label) => s
    ? `<a class="${cls}" href="sim.html?id=${encodeURIComponent(s.id)}"><span>${label}</span><b>${esc(s.title)}</b></a>`
    : `<span class="${cls} disabled" aria-hidden="true"></span>`;

  root.innerHTML = `
    <a class="back-link" href="index.html">← Back to all simulations</a>

    <div class="detail-head reveal in">
      <div class="badge">${topic.emoji}</div>
      <div>
        <span class="topic-badge">${topic.emoji} ${esc(topic.name)}</span>
        <h1>${esc(sim.title)}</h1>
      </div>
    </div>

    <p class="detail-story reveal in">${esc(sim.story || sim.blurb)}</p>

    <div class="launch-row reveal in">
      <a class="btn btn-primary" href="${esc(sim.path)}" target="_blank" rel="noopener">🚀 Open Fullscreen</a>
      <button class="btn btn-ghost" id="reload-sim" type="button">↻ Restart</button>
    </div>

    ${videoBlock}

    <div class="panel-label">🕹️ Try it yourself</div>
    <div class="sim-frame">
      <iframe id="sim-iframe" src="${esc(sim.path)}" title="${esc(sim.title)} simulation"
              allow="accelerometer; gyroscope; fullscreen" allowfullscreen loading="lazy"></iframe>
    </div>
    <p style="color:var(--ink-soft);font-size:13px;margin-top:10px">
      Simulation feels cramped? Tap <b>🚀 Open Fullscreen</b> above for the full experience.
    </p>

    <div class="pager">
      ${pagerLink(prev, 'prev', '← Previous')}
      ${pagerLink(next, 'next', 'Next →')}
    </div>`;

  // Restart button reloads the iframe
  const btn = document.getElementById('reload-sim');
  const frame = document.getElementById('sim-iframe');
  if (btn && frame) btn.addEventListener('click', () => { frame.src = sim.path; });

  /* Grow the frame to the simulation's own height so it never gets an inner
     scrollbar. Sims live in the same folder tree, so we can measure them.
     Kept inside sane bounds, and only applied when it actually differs. */
  let fitTries = 0;                       // guards against a resize feedback loop
  function fitFrame() {
    if (!frame || fitTries > 12) return;
    try {
      const doc = frame.contentDocument;
      if (!doc || !doc.documentElement) return;
      const needed = Math.max(doc.documentElement.scrollHeight, doc.body ? doc.body.scrollHeight : 0);
      const target = Math.min(Math.max(needed, 480), 1400);
      if (Math.abs(target - frame.clientHeight) > 4) {
        fitTries++;
        // the wrapper carries the height and clips overflow; +2 for its border,
        // the iframe itself stays at the CSS height:100%
        frame.parentNode.style.height = (target + 2) + 'px';
      }
    } catch (e) { /* different origin: keep the CSS height */ }
  }

  if (frame) {
    frame.addEventListener('load', () => {
      fitTries = 0;
      fitFrame();
      setTimeout(fitFrame, 400);
      // the sim reflows as the frame grows, so track its height until it settles
      try {
        const body = frame.contentDocument && frame.contentDocument.body;
        if (body && window.ResizeObserver) new ResizeObserver(fitFrame).observe(body);
      } catch (e) { /* different origin */ }
    });
    window.addEventListener('resize', () => { fitTries = 0; fitFrame(); });
  }
})();
