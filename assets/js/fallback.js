// Local File Protocol Fallback (Self-Healing Asset Paths & Animations)
(function() {
  if (window.location.protocol === 'file:') {
    // 1. Force override animations/opacity to make sure page elements are visible
    var style = document.createElement('style');
    style.innerHTML = '.fade-up, .fg-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }';
    document.head.appendChild(style);

    // 2. Calculate relative directory prefix depth
    var depth = 0;
    var fallbackScript = document.getElementById('file-protocol-fallback');
    if (fallbackScript) {
      var attrDepth = fallbackScript.getAttribute('data-depth');
      if (attrDepth !== null) {
        depth = parseInt(attrDepth, 10) || 0;
      } else {
        // Fallback to URL segment checking
        var pathName = window.location.pathname;
        var segments = pathName.split('/');
        var citiesIdx = segments.indexOf('cities');
        var resourcesIdx = segments.indexOf('resources');
        var toolsIdx = segments.indexOf('tools');
        if (citiesIdx !== -1) {
          depth = segments.length - 1 - citiesIdx;
        } else if (resourcesIdx !== -1) {
          depth = segments.length - 1 - resourcesIdx;
        } else if (toolsIdx !== -1) {
          depth = segments.length - 1 - toolsIdx;
        }
      }
    }
    var prefix = '';
    for (var i = 0; i < depth; i++) { prefix += '../'; }

    // 3. Helper function to rewrite attributes of elements dynamically
    var rewriteAttr = function(el, attr) {
      var val = el.getAttribute(attr);
      if (val) {
        if (attr === 'srcset') {
          var parts = val.split(',').map(function(part) {
            var trimmed = part.trim();
            var spaceIdx = trimmed.indexOf(' ');
            var path = spaceIdx === -1 ? trimmed : trimmed.substring(0, spaceIdx);
            var desc = spaceIdx === -1 ? '' : trimmed.substring(spaceIdx);
            if (path.startsWith('/') && !path.startsWith('//')) {
              return prefix + path.slice(1) + desc;
            }
            return part;
          });
          el.setAttribute(attr, parts.join(', '));
        } else if (val.startsWith('/') && !val.startsWith('//')) {
          var newVal = prefix + val.slice(1);
          if (attr === 'href') {
            if (newVal === '' || newVal.endsWith('/')) {
              newVal += 'index.html';
            }
          }
          el.setAttribute(attr, newVal);
        }
      }
    };

    // 4. Inject CSS dynamically with relative path if inside a subdirectory
    if (prefix) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = prefix + 'assets/css/bundle.min.css';
      document.head.appendChild(link);
    }

    // 5. Rewrite head elements that already loaded (preloads, links)
    var headLinks = document.head.getElementsByTagName('link');
    for (var i = 0; i < headLinks.length; i++) {
      rewriteAttr(headLinks[i], 'href');
    }
    var headScripts = document.head.getElementsByTagName('script');
    for (var i = 0; i < headScripts.length; i++) {
      rewriteAttr(headScripts[i], 'src');
    }

    // 6. Inject JS and rewrite body elements dynamically on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
      if (prefix) {
        // Check if bundle.min.js is already present in the document
        var scripts = document.getElementsByTagName('script');
        var alreadyHasBundle = false;
        for (var i = 0; i < scripts.length; i++) {
          var src = scripts[i].getAttribute('src') || '';
          if (src.indexOf('bundle.min.js') !== -1) {
            alreadyHasBundle = true;
            break;
          }
        }
        if (!alreadyHasBundle) {
          var script = document.createElement('script');
          script.src = prefix + 'assets/js/bundle.min.js';
          script.defer = true;
          document.body.appendChild(script);
        }
      }

      // Rewrite images, sources, anchors
      var imgs = document.getElementsByTagName('img');
      for (var i = 0; i < imgs.length; i++) {
        rewriteAttr(imgs[i], 'src');
        rewriteAttr(imgs[i], 'srcset');
      }
      var sources = document.getElementsByTagName('source');
      for (var i = 0; i < sources.length; i++) {
        rewriteAttr(sources[i], 'srcset');
      }
      var anchors = document.getElementsByTagName('a');
      for (var i = 0; i < anchors.length; i++) {
        rewriteAttr(anchors[i], 'href');
      }

      // Force picture tags to reload to apply rewritten source/srcset
      var pictures = document.getElementsByTagName('picture');
      for (var i = 0; i < pictures.length; i++) {
        var img = pictures[i].getElementsByTagName('img')[0];
        if (img) {
          var currentSrc = img.getAttribute('src');
          if (currentSrc) {
            img.setAttribute('src', '');
            img.setAttribute('src', currentSrc);
          }
        }
      }
    });
  }
})();
