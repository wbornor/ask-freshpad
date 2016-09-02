'use strict';

var speech = require('./speech');


var helpIntent = function () {
    this.attributes['currentIntent'] = 'AMAZON.HelpIntent';
    console.log(this.attributes['currentIntent']);
};

var unhandledIntent = function () {
    this.attributes['currentIntent'] = 'Unhandled';
    console.log(this.attributes['currentIntent']);
};

var AMAZONNoIntent = function () {
    this.attributes["currentIntent"] = "NoIntent";
    console.log(this.attributes['currentIntent']);
};

var AMAZONStopIntent = function () {
    console.log(this.attributes['currentIntent']);
    try {
        this.attributes["currentIntent"] = "StopIntent";
        this.attributes['endedSessionCount'] += 1;
    } catch (ignore) {
    }
    this.emit(':tell', speech.getRandomGoodbye());
};

var AMAZONCancelIntent = function () {
    this.attributes["currentIntent"] = "CancelIntent";
    console.log(this.attributes['currentIntent']);
    // try {
    //     this.attributes['endedSessionCount'] += 1;
    // } catch (ignore) {
    // }

};

var sessionEnded = function () {
    this.attributes["currentIntent"] = "SessionEndedRequest";
    console.log(this.attributes['currentIntent']);
    console.log('session ended!');
    //this.attributes['endedSessionCount'] += 1;
    console.log("session attributes: " + this.attributes.toString());
    this.emit(':saveState', true);
};

module.exports.helpIntent = helpIntent;
module.exports.unhandledIntent = unhandledIntent;
module.exports.AMAZONNoIntent = AMAZONNoIntent;
module.exports.AMAZONStopIntent = AMAZONStopIntent;
module.exports.AMAZONCancelIntent = AMAZONCancelIntent;
module.exports.sessionEnded = sessionEnded;
