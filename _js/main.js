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

    new LazyLoad({
        elements_selector: "iframe",
        show_while_loading: true
    });

    new LazyLoad({
        elements_selector: ".twitter-tweet",
        show_while_loading: true,
        callback_set: function() {
            loadJs("//platform.twitter.com/widgets.js");
        }
    });

    if(supports_history_api()) {
        bindLinkHandler(document.querySelectorAll("body > main a[href^='/']"));
    }
}

ready(init);
