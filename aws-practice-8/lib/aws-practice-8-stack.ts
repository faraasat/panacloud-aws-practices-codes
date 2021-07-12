import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as ddb from "@aws-cdk/aws-dynamodb";

export class AwsPractice8Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "GraphQL_API", {
      name: "GraphqlNotesApi",
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

    ///Print Graphql Api Url on console after deploy
    new cdk.CfnOutput(this, "APIGraphQlURL", {
      value: api.graphqlUrl,
    });

    ///Print API Key on console after deploy
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    ///Defining a DynamoDB Table
    const dynamoDBTable = new ddb.Table(this, "Table", {
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    const db_data_source = api.addDynamoDbDataSource(
      "db_data_source",
      dynamoDBTable
    );

    db_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "createNote",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition("id").auto(), ///Create an autoID for your primary Key Id
        appsync.Values.projecting() ///Add Remaining input values
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(), ////Mapping template for a single result item from DynamoDB.
    });

    db_data_source.createResolver({
      typeName: "Query",
      fieldName: "notes",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(), ///Mapping template to scan a DynamoDB table to fetch all entries.
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(), ////Mapping template for a result list from DynamoDB.
    });

    db_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "deleteNote",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem(
        "id",
        "id"
      ), ///Mapping template to delete a single item from a DynamoDB table.
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(), ////Mapping template for a single result item from DynamoDB.
    });

    db_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "updateNote",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        ///Mapping template to save a single item to a DynamoDB table.
        appsync.PrimaryKey.partition("id").is("id"), ///Where id is input ID
        appsync.Values.projecting()
      ), ///Add Remaining input values
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(), ////Mapping template for a single result item from DynamoDB.
    });
  }
}
