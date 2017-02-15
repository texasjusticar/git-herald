'use strict';

var settings = require("./settings.json");

var Slack = require('slack-node');
var apiToken = settings.apiToken;
var slack = new Slack(apiToken);

module.exports.gitHerald = (event, context, callback) => {

  var githubEvent = JSON.parse(event.body);

  if ((settings.users.indexOf(githubEvent.sender.login) > -1) && (githubEvent.action == "opened" || githubEvent.action == 'reopened')) {
   var message = "<!here|here> " + githubEvent.sender.login + " just " + githubEvent.action + " a pull request for " + githubEvent.repository.name;

    slack.api('chat.postMessage', {
      text: message + " : " + githubEvent.pull_request.html_url,
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
