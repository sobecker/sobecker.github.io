/* =====================================================================
   main.js — draws the decorative curves and the placeholder figures.
   You normally don't need to edit this file. Colors come from style.css.
   ===================================================================== */

const NS = 'http://www.w3.org/2000/svg';

/* Overlapping Gaussian curves: dark (familiar) → light (novel).
   Used on Home and Contact; any <svg data-curves="..."> gets drawn. */
function drawCurves(svg, { n = 5, h = 150, start = 80, step = 150, sigma = 60, width = 3, amp = 0.8 } = {}) {
  for (let k = 0; k < n; k++) {
    const mu = start + k * step;
    let d = '';
    for (let x = mu - 4 * sigma; x <= mu + 4 * sigma; x += 4) {
      const y = h - 6 - h * amp * Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma));
      d += (d ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
    }
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke-width', width);
    p.setAttribute('vector-effect', 'non-scaling-stroke');
    p.style.stroke = `var(--c${Math.min(k, 5)})`;
    svg.appendChild(p);
  }
}

document.querySelectorAll('svg[data-curves]').forEach(svg => {
  const presets = {
    hero:    { n: 6, start: 90,  step: 130, sigma: 55 },
    contact: { n: 4, start: 600, step: 110, sigma: 45, width: 2 },
    card:    { n: 4, h: 190, start: 80, step: 75, sigma: 32, amp: .72 },
  };
  drawCurves(svg, presets[svg.dataset.curves]);
});

/* ---------- Placeholder figures (only visible until you add images) ---------- */

// H-tree maze (curiosity card)
const maze = document.getElementById('figMaze');
if (maze) {
  const line = (x1, y1, x2, y2, w, c) => {
    const l = document.createElementNS(NS, 'line');
    Object.entries({ x1, y1, x2, y2, 'stroke-width': w, 'stroke-linecap': 'square' })
      .forEach(([k, v]) => l.setAttribute(k, v));
    l.style.stroke = c;
    maze.appendChild(l);
  };
  const H = (x, y, s, depth) => {
    if (depth === 0) return;
    const c = depth > 2 ? 'var(--c0)' : depth > 1 ? 'var(--c2)' : 'var(--c3)';
    line(x - s, y, x + s, y, depth + 1, c);
    line(x - s, y - s / 1.4, x - s, y + s / 1.4, depth + 1, c);
    line(x + s, y - s / 1.4, x + s, y + s / 1.4, depth + 1, c);
    [[x - s, y - s / 1.4], [x - s, y + s / 1.4], [x + s, y - s / 1.4], [x + s, y + s / 1.4]]
      .forEach(([a, b]) => H(a, b, s / 2, depth - 1));
  };
  H(200, 95, 70, 4);
}

// Small network (working-memory card)
const net = document.getElementById('figNet');
if (net) {
  const pts = [[110,60],[170,140],[230,50],[290,130],[200,95],[330,70],[80,135]];
  const edges = [[0,4],[1,4],[2,4],[3,4],[2,5],[3,5],[0,6],[1,6],[0,2],[1,3]];
  edges.forEach(([a, b], i) => {
    const l = document.createElementNS(NS, 'line');
    l.setAttribute('x1', pts[a][0]); l.setAttribute('y1', pts[a][1]);
    l.setAttribute('x2', pts[b][0]); l.setAttribute('y2', pts[b][1]);
    l.setAttribute('stroke-width', i % 3 ? 1.5 : 2.5);
    l.style.stroke = i % 3 ? 'var(--c3)' : 'var(--c1)';
    net.appendChild(l);
  });
  pts.forEach(([x, y], i) => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x); c.setAttribute('cy', y);
    c.setAttribute('r', i === 4 ? 14 : 10); c.setAttribute('stroke-width', 2);
    c.style.fill = i === 4 ? 'var(--accent)' : 'var(--card)';
    c.style.stroke = 'var(--c0)';
    net.appendChild(c);
  });
}

// Blurred Gabor patches ("next" card)
const gab = document.getElementById('figGabor');
if (gab) {
  [[40,30,120,30,'var(--c0)'],[170,70,90,-20,'var(--c1)'],[260,20,110,60,'var(--c2)'],[110,110,70,10,'var(--c3)']]
    .forEach(([x, y, s, a, c]) => {
      const g = document.createElement('div');
      g.className = 'gabor';
      Object.assign(g.style, {
        left: x + 'px', top: y + 'px', width: s + 'px', height: s + 'px',
        background: `repeating-linear-gradient(${a}deg, ${c} 0 5px, var(--panel) 5px 12px)`,
      });
      gab.prepend(g);
    });
}

// Museum walker (featured paper)
const museum = document.getElementById('figMuseum');
if (museum) {
  museum.innerHTML = `
    <rect x="18" y="40" width="70" height="55" fill="#c9c08a" stroke="#333" stroke-width="2"/>
    <rect x="170" y="40" width="70" height="55" fill="#2f4a7a" stroke="#333" stroke-width="2"/>
    <rect x="166" y="36" width="78" height="63" fill="none" stroke="#777" stroke-dasharray="3 3" stroke-width="2"/>
    <line x1="0" y1="38" x2="260" y2="38" stroke="#e39b4a" stroke-dasharray="5 4"/>
    <circle cx="128" cy="98" r="10" style="fill:var(--ink)"/>
    <path d="M128 110 L124 140 L112 165 M124 140 L138 165 M126 118 L108 132 M127 118 L150 108"
          style="stroke:var(--ink)" stroke-width="9" stroke-linecap="round" fill="none"/>
    <path d="M60 172 L210 172 L200 182 L50 182 Z" fill="#bbb"/>
    <ellipse cx="108" cy="22" rx="26" ry="15" style="fill:var(--card)" stroke="#777" stroke-width="2"/>
    <rect x="96" y="14" width="24" height="16" fill="#2f4a7a" opacity=".4"/>`;
}
