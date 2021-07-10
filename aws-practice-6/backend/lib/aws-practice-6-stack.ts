import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as appsync from "@aws-cdk/aws-appsync";
import * as ddb from "@aws-cdk/aws-dynamodb";

export class AwsPractice6Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "AwsPractice6GraphQLAPI", {
      name: "AwsPractice6GraphQLAPI",
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

    const lambda_function = new lambda.Function(this, "lambda_function", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "main.handler",
      timeout: cdk.Duration.seconds(10),
      memorySize: 1024,
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
      fieldName: "updateTodo",
    });

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo",
    });

    const todoTable = new ddb.Table(this, "todo_table", {
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    todoTable.grantFullAccess(lambda_function);
    lambda_function.addEnvironment("TODOS_TABLE", todoTable.tableName);

    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl || "",
    });

    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region,
    });
  }
}
