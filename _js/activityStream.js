var activityFirebase;
var $activityStream;
var activityStreamItems = [];

function populateActivityStream($el) {
    $activityStream = $el;
    console.log('populateActivityStream', $el);

    if(!activityFirebase) {
        activityFirebase = new Firebase("https://k94ncom-activity.firebaseio.com/log");
        activityFirebase.orderByChild("date").limitToLast(5).on("child_added", function(snapshot) {
            // console.log(snapshot.val().service, snapshot.val().date, snapshot.val().content, snapshot.val().link );
            addActivity(snapshot.val());
            renderActivityStream();
        });
    } else {
        renderActivityStream();
    }
}

function addActivity(item) {
    activityStreamItems.push(item);

    // sort by date
    activityStreamItems.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
    })
}

function renderActivityStream() {
    var $list = document.createElement("UL");

    for(var i = 0; i < activityStreamItems.length; i++) {
        var item = activityStreamItems[i];

        var $item = document.createElement("LI");
        $item.classList.add('activityStreamItem');
        $item.classList.add('activityStreamItem--'+item.service);
        $item.classList.add('activityStreamItem--'+item.action);

        var $content = document.createElement("DIV");
        $content.classList.add('activityStreamItem-content');
        $content.innerHTML = item.content;
        $item.appendChild($content);

        // var $link = document.createElement("A");
        // $link.href = item.link;
        // $link.innerHTML = item.link;
        // $content.appendChild($link);

        var $date = document.createElement("DIV");
        $date.classList.add('activityStreamItem-date');
        $date.innerHTML = prettyDate(new Date(), new Date(item.date));
        $item.appendChild($date);

        $list.insertBefore($item, $list.firstChild);
    }

    $activityStream.querySelector('ul').remove();
    $activityStream.appendChild($list);
}
