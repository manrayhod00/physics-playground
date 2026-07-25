/* Renders the hub: grade dropdowns → topic sections → cards, with live search. */
(function () {
  const TOPICS = window.TOPICS || [];
  const SIMS = window.SIMS || [];
  const GRADES = window.GRADES || [];

  const chipRow  = document.getElementById('chip-row');
  const sections = document.getElementById('sections');
  const noResults = document.getElementById('no-results');
  const search   = document.getElementById('search');

  // stats
  document.getElementById('stat-sims').textContent = SIMS.length;
  document.getElementById('stat-topics').textContent = TOPICS.length;

  const esc = (s) => String(s).replace(/[&<>"']/g, c =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  const inGrade = (g) => SIMS.filter(s => Number(s.grade) === Number(g.grade));

  // ---- Grade chips ----
  GRADES.forEach(g => {
    const a = document.createElement('a');
    a.className = 'chip';
    a.href = '#grade-' + g.grade;
    a.style.setProperty('--accent', g.color);
    const n = inGrade(g).length;
    a.innerHTML = `<span class="dot"></span>${esc(g.name)}` +
      (n ? ` <b class="chip-n">${n}</b>` : ' <span class="chip-soon">soon</span>');
    chipRow.appendChild(a);
  });

  // ---- Grade dropdowns, each holding its topic sections ----
  let openedOne = false;
  GRADES.forEach(g => {
    const gsims = inGrade(g);

    const det = document.createElement('details');
    det.className = 'grade reveal';
    det.id = 'grade-' + g.grade;
    det.style.setProperty('--accent', g.color);
    if (gsims.length && !openedOne) { det.open = true; openedOne = true; }  // first filled grade starts open

    det.innerHTML = `
      <summary class="grade-head">
        <span class="g-badge">${esc(String(g.grade))}</span>
        <span class="g-txt">
          <b>${esc(g.name)}</b>
          <small>${esc(g.tagline || '')}</small>
        </span>
        <span class="count">${gsims.length
          ? gsims.length + ' sim' + (gsims.length > 1 ? 's' : '')
          : 'coming soon'}</span>
        <span class="chev" aria-hidden="true">▾</span>
      </summary>
      <div class="grade-body"></div>`;

    const body = det.querySelector('.grade-body');

    TOPICS.forEach(t => {
      const sims = gsims.filter(s => s.topic === t.id);
      if (!sims.length) return;

      const sec = document.createElement('section');
      sec.className = 'section reveal';
      sec.id = 'topic-' + g.grade + '-' + t.id;      // a topic can appear in more than one grade
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
      body.appendChild(sec);
    });

    if (!gsims.length) {
      body.innerHTML = `<p class="soon">Simulations for ${esc(g.name)} are on the way ✏️</p>`;
    }

    sections.appendChild(det);
  });

  function makeCard(s, t) {
    const card = document.createElement('a');
    card.className = 'card reveal';
    card.href = 'sim.html?id=' + encodeURIComponent(s.id);
    card.style.setProperty('--accent', t.color);
    card.dataset.search = (s.title + ' ' + s.blurb + ' ' + t.name + ' grade ' + s.grade).toLowerCase();

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

  // ---- Live search: opens whichever grades hold a match, hides the rest ----
  let openBeforeSearch = null;        // the reader's own open/closed state, restored when the box clears

  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    const grades = [...document.querySelectorAll('.grade')];
    if (q && openBeforeSearch === null) openBeforeSearch = grades.map(d => d.open);

    let anyVisible = false;
    grades.forEach(gr => {
      let visibleInGrade = 0;
      gr.querySelectorAll('.section').forEach(sec => {
        let visibleInSec = 0;
        sec.querySelectorAll('.card').forEach(card => {
          const match = !q || card.dataset.search.includes(q);
          card.style.display = match ? '' : 'none';
          if (match) visibleInSec++;
        });
        sec.style.display = visibleInSec ? '' : 'none';
        visibleInGrade += visibleInSec;
      });
      gr.style.display = (q && !visibleInGrade) ? 'none' : '';
      if (q) gr.open = visibleInGrade > 0;
      if (visibleInGrade) anyVisible = true;
    });

    if (!q && openBeforeSearch) {
      grades.forEach((d, i) => { d.open = openBeforeSearch[i]; });
      openBeforeSearch = null;
    }
    noResults.style.display = anyVisible ? 'none' : 'block';
  });

  // ---- A chip (or a #grade-11 link) must open the grade it points at ----
  function openFromHash() {
    const el = document.getElementById((location.hash || '').slice(1));
    if (el && el.tagName === 'DETAILS') el.open = true;
  }
  chipRow.addEventListener('click', e => {
    const a = e.target.closest('.chip');
    if (!a) return;
    const el = document.querySelector(a.getAttribute('href'));
    if (el && el.tagName === 'DETAILS') el.open = true;
  });
  addEventListener('hashchange', openFromHash);
  openFromHash();

  // ---- Reveal on scroll (cards inside a closed grade reveal when it opens) ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
