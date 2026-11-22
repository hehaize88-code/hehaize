(() => {
  function install() {
    const shortcut = document.querySelector('a.image-search-shortcut[href*="image-search"]');
    if (!shortcut) return;
    for (const form of document.querySelectorAll('form.product-search')) {
      if (!form.querySelector('.image-camera')) addCamera(form,shortcut);
    }
  }
  function addCamera(form,shortcut) {
    const camera = document.createElement('a');
    camera.className = 'image-camera';
    camera.href = shortcut.href;
    const label = shortcut.textContent.trim().replace(/[→↗]\s*$/, '').trim();
    camera.setAttribute('aria-label', label);
    camera.title = label;
    camera.innerHTML = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" style="position:static;display:block;width:19px;height:19px"><path d="M3 7h4l1.6-2.5h6.8L17 7h4v12H3z"/><circle cx="12" cy="12.5" r="3.5"/></svg>';
    const submit = form.querySelector('[type=submit]');
    if (submit) submit.before(camera); else form.append(camera);
  }
  install();
  window.addEventListener('load', install, {once:true});
  window.addEventListener('pageshow', install);
})();
