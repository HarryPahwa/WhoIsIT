/**
 * HTTP GET example
 * 
 * Additional Notes
 * https://developer.amazon.com/appsandservices/solutions/alexa/alexa-skills-kit/getting-started-guide
 */

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
             context.fail("Invalid Application ID");
         }
        */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                         context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                         context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
                + ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
                + ", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
                + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if ("HelpIntent" === intentName) {
    } else {
        throw "Invalid intent";
    }
}


/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
                + ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.

    var sessionAttributes = {};
    var repromptText = null;

    var cardTitle = "Http GET Example";

    //test http get
    testGet(function (response) {

        var speechOutput =  response+" is waiting outside for you. Please prepare.";
        var shouldEndSession = true;

        callback(sessionAttributes,
                 buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

    });



}

function getJson(callback){


    console.log("FUCK YOU")
    
    var request = require("request")

    var url = "https://who-is-it-alexa-rpi-project.firebaseio.com/DoorBell/Name/.json"
    var name="Default"
    name=request({
        url: url,
        json: true
    }, function (error, response, body) {
        console.log("IM HERE");
    if (!error && response.statusCode === 200) {
        var neededName="LOL";
        console.log(body) // Print the json response
        neededName=JSON.stringify(body);
        console.log("Needed "+neededName)
        callback(neededName);
    }
    })
}

function testGet(response) {
    getJson(function(data){
        console.log("darta"+data);
        response(data);
    })

    /*console.log("FUCK YOU")
    
    var request = require("request")

    var url = "https://who-is-it-alexa-rpi-project.firebaseio.com/DoorBell/Name/.json"
    var name="Default"
    name=request({
        url: url,
        json: true
    }, function (error, response, body) {
        console.log("IM HERE");
    if (!error && response.statusCode === 200) {
        var neededName="LOL";
        console.log(body) // Print the json response
        neededName=JSON.stringify(body);
        console.log("Needed "+neededName)
        return neededName;
    }
    })
response(name);*/

    /*var http = require('http');
    var options = {
        host: 'who-is-it-alexa-rpi-project.firebaseio.com',
        port: 80,
        path: '/DoorBell/Name/.json',
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };
    
    var x = http.request(options,function(res){
    console.log("Connected");
    res.on('data',function(data){
        console.log(data);
        response(data);
    });
});

x.end();*/
    /*http.get(options, function (res) {
        console.log("Response: " + res.statusCode);
        response(res.statusCode);
    }).on('error', function (e) {
        response(e.message);
        console.log("Error message: " + e.message);
    });
*/
}


// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            // title: "SessionSpeechlet - " + title,
            // content: "SessionSpeechlet - " + output
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    }
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }
}