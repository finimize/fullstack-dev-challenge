import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
