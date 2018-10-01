const express = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')
const {
  CALCULATE_SAVINGS_RESULT,
} = require('./client/src/api/stubs/calculateSavings')

const schema = buildSchema(`
    type Query {
        calculateSavings(initialSavings: Float,
        monthlySavings: Float,
        yearlyInterest: Float,
        interestRecurrency: InterestRecurrency): [Calculations]
    },
    type Calculations {
        month: Int
        amount: Float
    }
    enum InterestRecurrency {
      Monthly
      Quarterly
      Yearly
    }
`)

const calculateSavings = args => {
  console.log(args)
  return CALCULATE_SAVINGS_RESULT.calculations
}

const root = { calculateSavings }

const app = express()

app.set('port', process.env.PORT || 3001)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
)

app.listen(4000, () =>
  console.log('Express GraphQL Server Now Running On localhost:4000/graphql'),
)
