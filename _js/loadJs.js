function loadJs(src) {
    var resource = document.createElement('script');
    resource.src = src;
    var script = document.getElementsByTagName('script')[0];
    script.parentNode.insertBefore(resource, script);
}
