/* Shared behaviour for learning/blog pages:
   - theme toggle persisted under the same key as the main site
   - syntax highlighting for multi-line code blocks (highlight.js)
   - service worker registration */
(function () {
    var body = document.body, KEY = 'uri-theme';

    function applyTheme(theme) {
        var dark = theme === 'dark';
        body.classList.toggle('dark-mode', dark);
        var icon = document.querySelector('.theme-toggle i');
        if (icon) icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    }

    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (!saved) {
        saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(saved);

    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.addEventListener('click', function () {
        var next = body.classList.contains('dark-mode') ? 'light' : 'dark';
        try { localStorage.setItem(KEY, next); } catch (e) {}
        applyTheme(next);
    });

    // Highlight only multi-line code blocks (leaves inline code alone).
    function highlightCode() {
        if (!window.hljs) return;
        document.querySelectorAll('code').forEach(function (el) {
            if (el.textContent.indexOf('\n') !== -1 && !el.classList.contains('hljs')) {
                window.hljs.highlightElement(el);
            }
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', highlightCode);
    } else {
        highlightCode();
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').catch(function () {});
        });
    }
})();
