'use strict';

var speech = require('./speech');


var helpIntent = function () {
    this.attributes['currentIntent'] = 'AMAZON.HelpIntent';
    console.log("currentIntent: " + this.attributes['currentIntent']);

    this.emit(":ask", speech.getRandom(speech.help), speech.getRandom(speech.help));
};

var unhandledIntent = function () {
    this.attributes['currentIntent'] = 'Unhandled';
    console.log("currentIntent: " + this.attributes['currentIntent']);
};

var AMAZONNoIntent = function () {
    this.attributes["currentIntent"] = "NoIntent";
    console.log("currentIntent: " + this.attributes['currentIntent']);
};

var AMAZONStopIntent = function () {
    try {
        this.attributes["currentIntent"] = "StopIntent";
        this.attributes['endedSessionCount'] += 1;
    } catch (ignore) {
    }
    console.log("currentIntent: " + this.attributes['currentIntent']);
    this.emit(":tell", speech.getRandom(speech.bye));
};

var AMAZONCancelIntent = function () {
    this.attributes["currentIntent"] = "CancelIntent";
    console.log("currentIntent: " + this.attributes['currentIntent']);
    // try {
    //     this.attributes['endedSessionCount'] += 1;
    // } catch (ignore) {
    // }

};

var sessionEnded = function () {
    this.attributes["currentIntent"] = "SessionEndedRequest";
    console.log("currentIntent: " + this.attributes['currentIntent']);
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
