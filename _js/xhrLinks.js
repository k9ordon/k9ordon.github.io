function supports_history_api() {
  return !!(window.history && history.pushState);
}

function dispatchPage(url) {
    if(!url) return console.error("No url");

	var oReq = new XMLHttpRequest();
	oReq.onload = function(e) {
        applyPage(e.target.response);
	};
	oReq.open('GET', url, true);
	oReq.send();
}

function applyPage(markup) {
    var $root = document.createElement("div");
    $root.innerHTML = markup;

    var $newTitle = $root.querySelector("title");
    var $newMain = $root.querySelector("main");
    var $newLogoA = $root.querySelector(".logo a");

    document.title = $newTitle.innerText;
    document.querySelector("main").innerHTML = $newMain.innerHTML;
    document.querySelector("main").classList = $newMain.classList;
    document.querySelector(".logo a").href = $newLogoA.href || "/";

    if(ga) ga('send', 'pageview');

    renderPage();
}

function bindLinkHandler($links) {
	var i;
	for (i = 0; i < $links.length; i++) {
		var $link = $links[i];
		$link.addEventListener("click", function(e) {
            var linkPath = this.pathname;
			history.pushState({ url: linkPath }, null, linkPath);
			dispatchPage(linkPath);
            window.scrollTo(0,0);
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
    	dispatchPage(e.state.url);
    });
}

init();
