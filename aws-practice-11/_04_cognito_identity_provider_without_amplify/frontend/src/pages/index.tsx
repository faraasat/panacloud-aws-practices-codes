import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import config from "../config"

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <h1>Home</h1>
      <button
        onClick={() => {
          window.location.href = `${config.domainUrl}/login?client_id=${config.clientId}&response_type=code&scope=email+openid&redirect_uri=${config.loginRedirectUri}`
        }}
      >
        Login
      </button>
    </Layout>
  )
}

export default IndexPage
