function prettyDate(startDate) {
    var date = new Date();
    var secs = Math.floor((date.getTime() - startDate.getTime()) / 1000);
    if (secs < 60) return secs + " seconds ago";
    if (secs < 3600) return Math.floor(secs / 60) + " minutes ago";
    if (secs < 86400) return Math.floor(secs / 3600) + " hours ago";
    if (secs < 604800) return Math.floor(secs / 86400) + " days ago";
    return date.toDateString();
}
