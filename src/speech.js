'use strict';

var invocationName = "Freshpad";

var bye = [
    "Thanks.  Bye!",
    "Catch you later.",
    "Thanks, Cya!"
];

function getRandom(floor, ceiling) {
    return Math.floor((Math.random() * ceiling) + floor);
}

function getRandomGoodbye() {
    return bye[getRandom(0, (bye.length - 1))];
}

module.exports.invocationName = invocationName;
module.exports.getRandomGoodbye = getRandomGoodbye;

