/* Renders the hub: topic chips + topic sections + cards, with live search. */
(function () {
  const TOPICS = window.TOPICS || [];
  const SIMS = window.SIMS || [];

  const chipRow  = document.getElementById('chip-row');
  const sections = document.getElementById('sections');
  const noResults = document.getElementById('no-results');
  const search   = document.getElementById('search');

  // stats
  document.getElementById('stat-sims').textContent = SIMS.length;
  document.getElementById('stat-topics').textContent = TOPICS.length;

  const esc = (s) => String(s).replace(/[&<>"']/g, c =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  // ---- Topic chips ----
  TOPICS.forEach(t => {
    const a = document.createElement('a');
    a.className = 'chip';
    a.href = '#topic-' + t.id;
    a.style.setProperty('--accent', t.color);
    a.innerHTML = `<span class="dot"></span>${t.emoji} ${esc(t.name)}`;
    chipRow.appendChild(a);
  });

  // ---- Sections + cards ----
  TOPICS.forEach(t => {
    const sims = SIMS.filter(s => s.topic === t.id);
    if (!sims.length) return;

    const sec = document.createElement('section');
    sec.className = 'section reveal';
    sec.id = 'topic-' + t.id;
    sec.style.setProperty('--accent', t.color);

    sec.innerHTML = `
      <div class="section-head">
        <div class="badge">${t.emoji}</div>
        <div>
          <h2>${esc(t.name)}</h2>
          <p>${esc(t.tagline || '')}</p>
        </div>
        <div class="count">${sims.length} sim${sims.length > 1 ? 's' : ''}</div>
      </div>
      <div class="grid"></div>`;

    const grid = sec.querySelector('.grid');
    sims.forEach(s => grid.appendChild(makeCard(s, t)));
    sections.appendChild(sec);
  });

  function makeCard(s, t) {
    const card = document.createElement('a');
    card.className = 'card reveal';
    card.href = 'sim.html?id=' + encodeURIComponent(s.id);
    card.style.setProperty('--accent', t.color);
    card.dataset.search = (s.title + ' ' + s.blurb + ' ' + t.name).toLowerCase();

    const thumbInner = s.thumb
      ? `<img src="${esc(s.thumb)}" alt="${esc(s.title)}" loading="lazy"
            onerror="this.remove();this.parentNode.insertAdjacentHTML('afterbegin','<span class=&quot;emoji&quot;>${t.emoji}</span>')" />`
      : `<span class="emoji">${t.emoji}</span>`;

    const playTag = s.youtube ? `<span class="play">▶ Video</span>` : '';

    card.innerHTML = `
      <div class="thumb">${thumbInner}${playTag}</div>
      <div class="body">
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.blurb)}</p>
        <span class="go">Explore <span aria-hidden="true">→</span></span>
      </div>`;
    return card;
  }

  // ---- Live search ----
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let anyVisible = false;
    document.querySelectorAll('.section').forEach(sec => {
      let visibleInSec = 0;
      sec.querySelectorAll('.card').forEach(card => {
        const match = !q || card.dataset.search.includes(q);
        card.style.display = match ? '' : 'none';
        if (match) visibleInSec++;
      });
      sec.style.display = visibleInSec ? '' : 'none';
      if (visibleInSec) anyVisible = true;
    });
    noResults.style.display = anyVisible ? 'none' : 'block';
  });

  // ---- Reveal on scroll ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
