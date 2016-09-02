'use strict';
var Alexa = require('alexa-sdk');
var AWS = require('aws-sdk');
var config = require('config');
var intents = require('./src/intents');

var newSessionHandlers = {
    'AMAZON.NoIntent': intents.AMAZONNoIntent,
    'AMAZON.HelpIntent': intents.helpIntent,
    "AMAZON.StopIntent": intents.AMAZONStopIntent,
    "AMAZON.CancelIntent": intents.AMAZONCancelIntent,
    'SessionEndedRequest': intents.sessionEnded,
    'Unhandled': intents.unhandledIntent
};

exports.handler = function (event, context, callback) {
    console.log("index started");

    var alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = config.get('sessionTableName');
    alexa.appId = config.get('appId');
    alexa.registerHandlers(newSessionHandlers);
    alexa.execute();

};
