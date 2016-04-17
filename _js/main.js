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

    new LazyLoad({
        elements_selector: "#heymojis",
        show_while_loading: true,
        callback_set: function() {
            loadJs("https://cdn.firebase.com/js/client/2.4.2/firebase.js", function() {
                heymojiFirebase = new Firebase("https://k94ncom-heymoji.firebaseio.com/");
                bindHeymojiHandler(document.querySelectorAll("body > main .heymoji"));
            });
        }
    });

    if(supports_history_api()) {
        bindLinkHandler(document.querySelectorAll("body > main a[href^='/']"));
    }
}

ready(init);
