function init() {
    loadCSS('/assets/non-critical.css');

    if(supports_history_api()) {
        initXhrLinks();
        bindLinkHandler(document.querySelectorAll("body > aside a[href^='/']"));
    }

    renderPage();
}

function renderPage() {
    new LazyLoad();

    if(supports_history_api()) {
        bindLinkHandler(document.querySelectorAll("body > main a[href^='/']"));
    }
}

ready(init);
