import fetch from "cross-fetch"
import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://g4zlcx53rjgozirnx4vuapiqrq.appsync-api.us-east-1.amazonaws.com/graphql",
    fetch,
    headers: {
      "x-api-key": process.env.GATSBY_GRAPHQL_API_KEY,
    },
  }),
  cache: new InMemoryCache(),
})
