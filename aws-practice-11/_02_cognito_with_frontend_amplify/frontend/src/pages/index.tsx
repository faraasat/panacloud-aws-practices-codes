import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"

const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>()
  const [user, setUser] = React.useState<any>()

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  return (
    <Layout>
      <Seo title="Home" />
      {authState === AuthState.SignedIn && user ? (
        <div className="App">
          <div>Hello, {user.username}</div>
          <AmplifySignOut />
        </div>
      ) : (
        <AmplifyAuthenticator />
      )}
    </Layout>
  )
}

export default AuthStateApp
