import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";

export class AwsPractice2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hello_lambda = new lambda.Function(this, "hello_lambda", {
      runtime: lambda.Runtime.NODEJS_10_X, // What will be the runtime environment
      code: lambda.Code.fromAsset("lambda"), // It will find the handler file in this folder
      handler: "hello.handler", // Tell the file name where handler function is present
    });

    new apigw.LambdaRestApi(this, "Endpoint", {
      handler: hello_lambda,
    });
  }
}
