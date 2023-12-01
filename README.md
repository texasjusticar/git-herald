# git-herald
This serverless application will take github events
(initially new pull requests) and end them to your
company's chat channel of choice (initially slack).

## Setup
Create a local settings.json file.  Take note that if
you have multiple copies of this in your organization,
your settings will overwrite each other when deploying.

Add webhook to each github repository for the action
'Pull Request'.
