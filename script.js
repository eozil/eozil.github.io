const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

links.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

function initSvgViewers() {
  const viewers = document.querySelectorAll('[data-svg-viewer]');
  viewers.forEach((viewer) => {
    const stage = viewer.querySelector('.svg-viewer__stage');
    const pane = viewer.querySelector('[data-pane]');
    const zoomInBtn = viewer.querySelector('[data-zoom-in]');
    const zoomOutBtn = viewer.querySelector('[data-zoom-out]');
    const resetBtn = viewer.querySelector('[data-zoom-reset]');
    const MIN_SCALE = 1, MAX_SCALE = 6;
    let scale = 1, x = 0, y = 0, isDragging = false;
    let startPointer = { x: 0, y: 0 }, startPane = { x: 0, y: 0 };
    let pinchStartDist = null, pinchStartScale = 1;

    function apply() { pane.style.transform = `translate(${x}px, ${y}px) scale(${scale})`; }
    function clamp() {
      const rect = stage.getBoundingClientRect();
      x = Math.min(0, Math.max(rect.width * (1 - scale), x));
      y = Math.min(0, Math.max(rect.height * (1 - scale), y));
    }
    function zoomAt(px, py, factor) {
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * factor));
      if (newScale === scale) return;
      x = px - ((px - x) / scale) * newScale;
      y = py - ((py - y) / scale) * newScale;
      scale = newScale; clamp(); apply();
    }

    stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = stage.getBoundingClientRect();
      zoomAt(e.clientX - rect.left, e.clientY - rect.top, e.deltaY < 0 ? 1.15 : 1 / 1.15);
    }, { passive: false });

    stage.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      isDragging = true; stage.classList.add('is-dragging'); stage.setPointerCapture(e.pointerId);
      startPointer = { x: e.clientX, y: e.clientY }; startPane = { x, y };
    });
    stage.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      x = startPane.x + (e.clientX - startPointer.x);
      y = startPane.y + (e.clientY - startPointer.y);
      clamp(); apply();
    });
    function endDrag() { isDragging = false; stage.classList.remove('is-dragging'); }
    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);
    stage.addEventListener('pointerleave', endDrag);

    stage.addEventListener('dblclick', (e) => {
      const rect = stage.getBoundingClientRect();
      zoomAt(e.clientX - rect.left, e.clientY - rect.top, scale > 1.5 ? (1 / scale) : 2.5);
    });

    stage.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) { isDragging = false; pinchStartDist = null; }
    }, { passive: true });
    stage.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const [t1, t2] = e.touches;
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const rect = stage.getBoundingClientRect();
        const midX = (t1.clientX + t2.clientX) / 2 - rect.left;
        const midY = (t1.clientY + t2.clientY) / 2 - rect.top;
        if (pinchStartDist === null) { pinchStartDist = dist; pinchStartScale = scale; }
        else zoomAt(midX, midY, (dist / pinchStartDist) * pinchStartScale / scale);
      }
    }, { passive: false });
    stage.addEventListener('touchend', () => { pinchStartDist = null; });

    zoomInBtn.addEventListener('click', () => { const r = stage.getBoundingClientRect(); zoomAt(r.width / 2, r.height / 2, 1.3); });
    zoomOutBtn.addEventListener('click', () => { const r = stage.getBoundingClientRect(); zoomAt(r.width / 2, r.height / 2, 1 / 1.3); });
    resetBtn.addEventListener('click', () => { scale = 1; x = 0; y = 0; apply(); });

    viewer.addEventListener('keydown', (e) => {
      const r = stage.getBoundingClientRect();
      if (e.key === '+' || e.key === '=') zoomAt(r.width / 2, r.height / 2, 1.3);
      if (e.key === '-') zoomAt(r.width / 2, r.height / 2, 1 / 1.3);
      if (e.key === '0') { scale = 1; x = 0; y = 0; apply(); }
    });
    apply();
  });
}
document.addEventListener('DOMContentLoaded', initSvgViewers);
