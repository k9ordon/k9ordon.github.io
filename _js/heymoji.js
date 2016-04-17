var heymojiFirebase = null;

function bindHeymojiHandler($els) {
    var i;
    for (i = 0; i < $els.length; i++) {
        var $heymoji = $els[i];
        $heymoji.addEventListener("click", function(e) {
            var id = this.dataset.id;
            hitHeymoji(id);
            e.preventDefault();
        });

        heymojiFirebase.child($heymoji.dataset.id).on("value", function(snapshot) {
            updateHeymoji(snapshot.key(), snapshot.val());
        });
    }
}

function hitHeymoji(id) {
    heymojiFirebase.child(id).transaction(function(currentCount) {
      return currentCount+1;
    });
}

function updateHeymoji(id, val) {
    var $heymojis = document.querySelectorAll('.heymoji[data-id="' + id + '"]');
    for (i = 0; i < $heymojis.length; i++) {
        var $heymoji = $heymojis[i];
        $heymoji.querySelector('.heymoji-val').innerText = parseInt(val) | 0;
    }
}
