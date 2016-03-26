function setProgress(percentage) {
    var $progressBar = document.querySelector(".progressBar");

    if(percentage == 100) {
        setTimeout(function() {
            $progressBar.classList.remove("progressBar--loading");
            $progressBar.style.width = 0 + "%";
        }, 500);
    } else {
        $progressBar.classList.add("progressBar--loading");
    }

    $progressBar.style.width = percentage + "%";
}
