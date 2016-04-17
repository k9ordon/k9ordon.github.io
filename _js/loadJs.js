function loadJs(src, callback) {
    var $resource = document.createElement('script');
    $resource.src = src;
    $resource.type = "text/javascript";
    $resource.async = true;
    $resource.addEventListener('load', function() {
        if(callback) callback();
    });

    var $script = document.getElementsByTagName('script')[0];
    $script.parentNode.insertBefore($resource, $script);
}
