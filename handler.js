'use strict';

var settings = require("./settings.json");

var Slack = require('slack-node');
var apiToken = settings.apiToken;
var slack = new Slack(apiToken);

module.exports.gitHerald = (event, context, callback) => {
  var event = event.Records[0].Sns.Message;
  var githubEvent = JSON.parse(event);

  if (settings.users.indexOf(githubEvent.sender.login) > -1) && (githubEvent.action == "opened") {
    var message = githubEvent.sender.login + " just opened a pull request for " + githubEvent.repository.name

    slack.api('chat.postMessage', {
      text: message + " : " + githubEvent.pull_request.url,
      channel: settings.channel
    }, function(err, response){
      console.log(response);
    });
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
