/* eslint-disable */

const awsmobile = {
  aws_project_region: "us-east-1", // REGION
  aws_cognito_region: "us-east-1", // REGION
  aws_user_pools_id: "us-east-1_gxH5o67Az", // ENTER YOUR USER POOL ID
  aws_user_pools_web_client_id: "33sq6ts9obubcvepo4c3ojjgfe", // ENTER YOUR CLIENT ID
  oauth: {
    domain: "bootcamp-mognito-mine.auth.us-east-1.amazoncognito.com", // ENTER COGNITO DOMAIN LIKE: eru-test-pool.auth.us-east-1.amazoncognito.com
    scope: ["phone", "email", "openid", "profile"],
    redirectSignIn: "http://localhost:8000/", // ENTER YOUR SITE (enter http://localhost:8000 if testing frontend locally)
    redirectSignOut: "http://localhost:8000/", // ENTER YOUR SITE (enter http://localhost:8000 if testing frontend locally)
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
}

export default awsmobile
