# Finimize Full-Stack Development Challenge

This repo is a response to Finimize's full-stack dev challenge!

## Requirements

You will need [node.js](https://nodejs.org/en/download/) and [yarn](https://classic.yarnpkg.com/en/docs/install) installed.

## How to run

1. Install dependencies by running `yarn install`.
2. Run `yarn start` to start both, the API and the Client.
3. Look at your browser.
4. That's it! :)

## How to test

-   Run `yarn test` from the root directory to run all tests (back-end + front-end)

_Note:_ You can also run `yarn test-client` or `yarn test-server` to only run tests for a specific side of the application. Running `cd client && yarn test` will run all front-end tests in watch mode.

## Deployment

-   This application can be easily deployed to AWS by running `yarn deploy`. This will bundle the whole app (server + client) using webpack and upload it to a [lambda function](https://aws.amazon.com/lambda/). If everything goes as expected, the command will end by outputting logs with a live endpoint where the App can be accessed!

NOTE: To run `yarn deploy`, you will need to create an [AWS account](https://portal.aws.amazon.com/billing/signup#/start) (if you don't have one already) and setup an [AWS profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) named `playground`.

# THE END RESULT

If all goes well you should be able to have a working app that looks like this:

![working app](./readme_demos/end_result.gif)

## client features

#### User input is debounced when it changes too quickly

![debounce demo](./readme_demos/debounce.gif)

#### User input is validated before requests are sent

![input validation demo](./readme_demos/input_validation.gif)

#### Loading state for slow connections

![loading demo](./readme_demos/loading.gif)

#### Handles errors and tells the user what's going on

![error handling demo](./readme_demos/error.gif)

## server features

#### Fully fledged `getProjections/` rpc endpoint:

-   Spec
    | query param | required | type | default | must be |
    |:---------------:|:--------:|:-------:|:-------:|:-----------------:|
    | initial_savings | yes | number | - | >= 0 |
    | monthly_deposit | yes | number | - | >= 0 |
    | start_year | no | integer | 0 | >= 0 |
    | end_year | no | integer | 50 | >= start_year |
    | start_interest | no | integer | 0 | >= 0 |
    | end_interest | no | integer | 15 | >= start_interest |

-   Response type:

```typescript
{
    projections?: {
        [interestRatePercentage: number]: {
            [year: number]: number
        }
    }
    errors?: {
        value: string,
        msg: string,
        param: string,
        location: string,
    }[]
}
```

-   Example 1 - valid response

```typescript
const query =
    '/getProjections?initial_savings=1000&monthly_deposit=100&start_year=0&end_year=1&start_interest=0&end_interest=2'

const response = {
    projections: {
        0: {
            0: 1000,
            1: 2200,
        },
        1: {
            0: 1000,
            1: 2215.5612673489027,
        },
        2: {
            0: 1000,
            1: 2231.245696571609,
        },
    },
}
```

-   Example 2 - invalid request

```typescript
const query = '/getProjections?initial_savings=1000&monthly_deposit=100&start_year=0.4'

const response = {
    errors: [
        {
            value: '0.4',
            msg: 'must be an integer',
            param: 'start_year',
            location: 'query',
        },
    ],
}
```

#### CREDITS

-   [Finimize](https://www.finimize.com/)
-   [Create React App](https://create-react-app.dev/)
-   [Serverless Framework](https://www.serverless.com/)

Thanks for reading!
