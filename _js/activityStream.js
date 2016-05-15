var activityFirebase;
var $activityStream;
var activityStreamItems = [];

function populateActivityStream($el) {
    $activityStream = $el;
    // console.log('populateActivityStream', $el);

    if(!activityFirebase) {
        activityFirebase = new Firebase("https://k94ncom-activity.firebaseio.com/log");
        activityFirebase.orderByChild("date").limitToLast(10).on("child_added", function(snapshot) {
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

        var $item = createActivityStreamItem(item);

        $list.insertBefore($item, $list.firstChild);
    }

    $activityStream.querySelector('ul').remove();
    $activityStream.appendChild($list);
}

function createActivityStreamItem(item) {
    // modify content
    var content = item.content;
    var emoji = false;

    if(item.action == "beer" && item.service == "untappd.com") {
        content = "Drinking a " + content;
        emoji = "/assets/build/emoji/unicode/1f37a.png";
    } else if(item.action == "charts" && item.service == "last.fm") {
        content = "Playing a lot of " + content;
        emoji = "/assets/build/emoji/unicode/1f3a7.png";
    } else if(item.action == "recommend" && item.service == "medium.com") {
        content = "Enjoyed reading " + content;
        emoji = "/assets/build/emoji/unicode/1f60d.png";
    } else if(item.action == "star" && item.service == "github.com") {
        content = "Liked " + content;
        emoji = "/assets/build/emoji/unicode/2b50.png";
    }

    // nl to br
    content = content.replace(/\n/g, "<br />");

    // create item
    var $item = document.createElement("li");
    $item.classList.add('activityStreamItem');
    $item.classList.add('activityStreamItem--'+item.service);
    $item.classList.add('activityStreamItem--'+item.action);

    // create content
    var $content = document.createElement("a");
    $content.classList.add('activityStreamItem-content');
    $content.href = item.link;
    $content.innerHTML = content;
    $item.appendChild($content);

    // create meta
    var $meta = document.createElement("div");
    $meta.classList.add('activityStreamItem-meta');
    $item.appendChild($meta);

    if(emoji) {
        var $emoji = document.createElement("img");
        $emoji.classList.add('emoji');
        $emoji.classList.add('activityStreamItem-emoji');
        $emoji.align = "absmiddle";
        $emoji.src = emoji;
        $content.innerHTML += " ";
        $content.appendChild($emoji);
    }

    var $date = document.createElement("span");
    $date.classList.add('activityStreamItem-date');
    $date.innerHTML = prettyDate(new Date(item.date.slice(0,-5)));
    $meta.appendChild($date);

    var $service = document.createElement("span");
    $service.classList.add('activityStreamItem-service');
    $service.innerHTML = ' on ' + item.service;
    $meta.appendChild($service);


    return $item;
}
