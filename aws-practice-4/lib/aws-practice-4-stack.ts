import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";

export class AwsPractice4Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // AppSync API gives you a graphql api with api key
    const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
      name: "cdk-api",
      schema: appsync.Schema.fromAsset("graphql/schema.gql"), // path to show where schema is
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY, // Define Authorization Type
          // apiKeyConfig: {
          //   expires: cdk.Expiration.after(cdk.Duration.days(365))  // Set Expiration for API Key
          // }
        },
      },
      xrayEnabled: true, // To enable xray debugging
    });

    // Print URL of the GraphQL API
    new cdk.CfnOutput(this, "APIGraphQLURL", {
      value: api.graphqlUrl,
    });

    // Print API Key for the GraphQL API
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "", // value must have a value so if we donot specify apiKey in the appsync configuration this become empty and error come if we hadn't used ''
    });

    const lambda_function = new lambda.Function(this, "lambda_function", {
      runtime: lambda.Runtime.NODEJS_12_X, // Set NODE JS Runtime Environment
      code: lambda.Code.fromAsset("lambda"), // Path for lambda function directory
      handler: "index.handler", // Specific function in specific file
      timeout: cdk.Duration.seconds(10), // Time for function to break
    });

    const lambda_data_source = api.addLambdaDataSource(
      "lambdaDataSource",
      lambda_function
    );

    // Describing DataSource for Resolver
    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "hello",
    });

    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "myCustomMessage",
    });
  }
}
