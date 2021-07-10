import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import * as ddb from "@aws-cdk/aws-dynamodb";

export class AwsPractice5Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "BOOTCAMP_GRAPHQL_API", {
      name: "bootcamp-api",
      schema: appsync.Schema.fromAsset("graphql/schema.gql"),
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

    const todosLambda = new lambda.Function(this, "TodoLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "index.handler",
      memorySize: 1024,
      timeout: cdk.Duration.seconds(10),
    });

    const lambdaDataSource = api.addLambdaDataSource(
      "LambdaDataSource",
      todosLambda
    );

    lambdaDataSource.createResolver({
      typeName: "Query",
      fieldName: "getTodos",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo",
    });

    const todoTable = new ddb.Table(this, "bootcampTodoTable", {
      partitionKey: {
        // Partition Key is a primary key
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    todoTable.grantFullAccess(todosLambda); // To give todo table permission to communicate with lambda function
    todosLambda.addEnvironment("TODOS_TABLE", todoTable.tableName); // We make environment variable for table name because table name will be generated at random

    new cdk.CfnOutput(this, "APIGraphQLURL", {
      value: api.graphqlUrl,
    });

    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    new cdk.CfnOutput(this, "Stak Region", {
      value: this.region,
    });
  }
}
