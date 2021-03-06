
'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.872e6eb6-eb49-49c9-b9a0-3dddad88a83d";  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    
    'en-US': {
        translation: {
            FACTS: [
                'Person at the door',
                'It does not seem like anyone is at the door',
            ],
            SKILL_NAME: 'Check the door',
            GET_FACT_MESSAGE: "Let me check: ",
            HELP_MESSAGE: 'What do you want? you are pathetic',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    }
    
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        console.log('FUCK YOU')
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        var request = require("request")

        var url = "https://who-is-it-alexa-rpi-project.firebaseio.com/DoorBell/Name/.json"

        request({
            url: url,
            json: true
        }, function (error, response, body) {

    
        console.log(body) // Print the json response
        //response(JSON.stringify(body));
          // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + JSON.stringify(body);
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    
    
})

        
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
