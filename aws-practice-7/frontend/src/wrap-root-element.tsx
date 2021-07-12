import React from "react"
import { ApolloProvider } from "@apollo/client"
import { client } from "./apollo/client"

const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}

export default wrapRootElement
