(function () {
  // Determine if we are running locally (file:// protocol or local IP / localhost server)
  var isLocal = window.location.protocol === 'file:' || 
                window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' || 
                window.location.hostname.startsWith('192.168.') || 
                window.location.hostname.startsWith('10.') || 
                window.location.hostname.startsWith('172.');

  // 1. Clean the current page URL in the browser address bar (on the live site / GitHub Pages)
  // This replaces "filename.html" with "filename" in the address bar after the page successfully loads.
  if (!isLocal && window.location.pathname.endsWith('.html')) {
    var cleanPath = window.location.pathname.substring(0, window.location.pathname.length - 5);
    window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
  }

  // 2. Intercept click events on links
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href').trim();

    // Ignore empty, anchor-only, external, mailto/tel, or javascript links
    if (!href || 
        href.startsWith('#') || 
        href.startsWith('http://') || 
        href.startsWith('https://') || 
        href.startsWith('//') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') || 
        href.startsWith('javascript:')) {
      return;
    }

    var urlParts = href.split('#');
    var pathAndQuery = urlParts[0].split('?');
    var path = pathAndQuery[0];
    var query = pathAndQuery[1] ? '?' + pathAndQuery[1] : '';
    var hash = urlParts[1] ? '#' + urlParts[1] : '';

    var lastSegment = path.split('/').pop();
    if (!lastSegment) return;

    // If a link in the code is written as a clean URL (e.g. href="about"), 
    // we intercept the click and redirect to "about.html" under the hood 
    // so the browser can successfully load the physical HTML file.
    if (!lastSegment.includes('.')) {
      e.preventDefault();
      window.location.href = path + '.html' + query + hash;
    }
  });
})();
