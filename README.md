# Finimize Full-Stack Development Challenge

This repo is intended to be forked and uploaded to your own Github account in
order to form the submission for the challenge. Once cloned, it will give you a basic Node server with a React app, so you don't have to spend time writing
boilerplate code. Feel free to make any changes you wish - the existing code is purely intended to get you going faster.

## Run Instructions

To run the app, `cd` into the project root directory and run `yarn run start`
(install Yarn [here](https://yarnpkg.com/en/docs/install)).

There is one basic test written in the client, which you can run by performing
`cd client` and then `yarn run test`. Any new client tests can be added using Jest.

Mocha has been installed on the server to allow you to create server tests,
although none have been written yet.

## The Challenge

Create a web-app that shows how much you can expect to make from your savings
over time.

The app must satisfy the following Acceptance Criteria (ACs):
* It should allow the user to vary the initial savings amount, monthly deposit and interest rate through the UI
* It should display how much the user's initial savings amount will be worth
over the next 50 years, to a monthly precision. This should assume that the monthly amount is paid in each month, and the value rises with the interest rate supplied.
* It should allow the user to select how often interest is paid - either 'Monthly', 'Quarterly' or 'Annually'
* It should allow the user to optionally select another currency to display the results in. If this is selected, it should convert the results using the latest exchange rate from GBP via a 3rd party API (e.g. [Fixer](http://fixer.io/))
* All calculations must take place server-side, and all monthly projection data should be returned via an endpoint
* The calculations must be triggered onChange of any input, to give live feedback on the input data.
* You should manage app state using Redux (even though it is arguably overkill in this particular case)

### Our Guidance
The challenge should not take any more than 2-5 hours. We are most interested in the quality of your code, so please do not feel the need to spend hours putting together a ground-breaking UI. You do not need to complete the challenge in one go.

We are keen to see how much you think is enough, and how much would go into a Minimum Viable Product. As a guide, elegant and simple wins over feature rich every time.

Do you test drive your code? This is something we value. We want to see that you are familiar and able to create a build process for your code that means it is easy to build, test and run. Any indicator of BDD/TDD would make us smile.

Although the API might be returning relatively straightforward content, please try and write the API code as if you were building something more complex. We would like to gain an idea of how you would go about structuring API code.

When you are finished, you should send us a link to the codebase, preferably via git (e.g. github) showing multiple commits, so we can see its evolution.
