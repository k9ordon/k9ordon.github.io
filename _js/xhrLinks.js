function supports_history_api() {
    return !!(window.history && history.pushState);
}

function dispatchPage(url, scrollToTop) {
    if(!url) throw "No url";

    setProgress(20);

	var oReq = new XMLHttpRequest();
	oReq.onload = function(e) {
        setProgress(70);
        applyPage(url, e.target.response, scrollToTop);
	};
	oReq.open('GET', url, true);
	oReq.send();
}

function applyPage(url, markup, scrollToTop) {
    var $root = document.createElement("div");
    $root.innerHTML = markup;

    var $newTitle = $root.querySelector("title");
    var $newMain = $root.querySelector("main");
    var $newLogoA = $root.querySelector(".logo a");

    if(scrollToTop) {
        setTimeout(function() {
            var scrollTop = document.body.scrollTop,
                xhrScrollTop = 150;

            if(scrollTop > xhrScrollTop) scrollTop = 0;

            window.scrollTo(0,scrollTop);
        },100);
    }

    document.title = $newTitle.innerText;
    document.querySelector("main").innerHTML = $newMain.innerHTML;
    document.querySelector("main").classList = $newMain.classList;
    document.querySelector(".logo a").href = $newLogoA.href || "/";

    ga('set', { page: url, title: document.title });
    ga('send', 'pageview');

    renderPage();

    setProgress(100);
}

function bindLinkHandler($links) {
	var i;
	for (i = 0; i < $links.length; i++) {
		var $link = $links[i];
		$link.addEventListener("click", function(e) {
            var linkPath = this.pathname;
			history.pushState({ url: linkPath }, null, linkPath);
			dispatchPage(linkPath, true);
            e.preventDefault();
		});
	}
}

function initXhrLinks() {
    var href = window.location.href,
        host = window.location.host,
        path = href.substr(href.indexOf(host)+host.length);

    history.replaceState( { url: path } , false, path);

    window.addEventListener("popstate", function(e) {
    	dispatchPage(e.state.url, false);
    });
}
