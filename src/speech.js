'use strict';

var invocationName = "Freshpad";

var bye = [
    "Thanks.  Bye!",
    "Catch you later.",
    "Thanks, Cya!"
];

var help = [
    "Welcome to Freshpad! I can start a grocery session or update an item in your refrigerator, which would you like."
];

function getRandom(list) {
    var ceiling = list.length - 1, floor = 0;
    return list[Math.floor((Math.random() * ceiling) + floor)];
}


module.exports.invocationName = invocationName;
module.exports.help = help;
module.exports.bye = bye;
module.exports.getRandom = getRandom;

