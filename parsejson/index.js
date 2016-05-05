var https = require('https');

var urls = [
    "https://twitter.com/WeAreDevs/status/720200545185767424",
    "https://twitter.com/slemgrim/status/720195837452808196",
    "https://twitter.com/alex_hager/status/720196290039123970",
    "https://twitter.com/christophrumpel/status/720196512282755072",
    "https://twitter.com/Zensations/status/720196611100553216",
    "https://twitter.com/drunomics/status/720196852885385217",
    "https://twitter.com/OE8CLR/status/720196952147759104",
    "https://twitter.com/gnomx/status/720196962356748288",
    "https://twitter.com/wearewebclerks/status/720197136751706112",
    "https://twitter.com/paulroho/status/720197472723824640",
    "https://twitter.com/flecki89/status/720197473269063681",
    "https://twitter.com/bountin/status/720197541556563969",
    "https://twitter.com/eva_trostlos/status/720197594601889792",
    "https://twitter.com/jollife/status/720197817369759744",
    "https://twitter.com/irockwad16_/status/720198202260135936",
    "https://twitter.com/wozy8/status/720198368522321920",
    "https://twitter.com/bizarrochris/status/720198554527129600",
    "https://twitter.com/Zensations/status/720198694801448960",
    "https://twitter.com/christophrumpel/status/720198763864813568",
    "https://twitter.com/webmozart/status/720199011341307905",
    "https://twitter.com/pkpatrick/status/720199072750178304",
    "https://twitter.com/mario_sommer/status/720199188038959105",
    "https://twitter.com/ThaBrad_/status/720199429752492033",
    "https://twitter.com/wearewebclerks/status/720199808372383745",
    "https://twitter.com/bountin/status/720199998940573696",
    "https://twitter.com/lilachaos/status/720200177777307648",
    "https://twitter.com/wearewebclerks/status/720201646169583616",
    "https://twitter.com/saintedlama/status/720202315760803840",
    "https://twitter.com/crizzirc/status/720202992838930432"
];

urls.forEach(function(url) {
    https.get("https://api.twitter.com/1/statuses/oembed.json?url=" + url, function(res){
        var body = '';
        res.on('data', function(chunk){
            body += chunk;
        });
        res.on('end', function(){
            var response = JSON.parse(body);

            console.log(response);

            // var html = response.html.replace('<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>', "");
            // console.log("\n\n"+html);
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });
});
