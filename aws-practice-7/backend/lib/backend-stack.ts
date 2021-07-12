import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as ddb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "AWSPractice7GraphQLAPI", {
      name: "graphQL_API",
      schema: appsync.Schema.fromAsset("schema/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
      xrayEnabled: true,
    });

    const lambda_function = new lambda.Function(this, "lambda_function", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "main.handler",
      memorySize: 1024,
      timeout: cdk.Duration.seconds(10),
    });

    const lambda_data_source = api.addLambdaDataSource(
      "lambda_data_source",
      lambda_function
    );

    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "getTodos",
    });

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo",
    });

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo",
    });

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo",
    });

    const todosTable = new ddb.Table(this, "TodoTable", {
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    todosTable.grantFullAccess(lambda_function);

    lambda_function.addEnvironment("TODOS_TABLE", todosTable.tableName);

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl,
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region,
    });
  }
}
