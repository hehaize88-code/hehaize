(() => {
  function install() {
    const input = document.getElementById('product-query');
    const form = input?.form;
    const shortcut = document.querySelector('a.image-search-shortcut[href*="image-search"]');
    if (!form || !shortcut || form.querySelector('.image-camera')) return;
    const camera = document.createElement('a');
    camera.className = 'image-camera';
    camera.href = shortcut.href;
    const label = shortcut.textContent.trim().replace(/[→↗]\s*$/, '').trim();
    camera.setAttribute('aria-label', label);
    camera.title = label;
    camera.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;flex:0 0 2.5rem;width:2.5rem;height:2.5rem;color:inherit;';
    camera.innerHTML = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" style="position:static;display:block;width:19px;height:19px"><path d="M3 7h4l1.6-2.5h6.8L17 7h4v12H3z"/><circle cx="12" cy="12.5" r="3.5"/></svg>';
    form.insertBefore(camera, form.querySelector('[type=submit]'));
    shortcut.hidden = true;
    shortcut.style.display = 'none';
  }
  if (document.readyState === 'complete') install();
  else window.addEventListener('load', install, {once:true});
  window.addEventListener('pageshow', install);
})();
