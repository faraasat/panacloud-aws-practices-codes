import * as cdk from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";
import * as lambda from "@aws-cdk/aws-lambda";
import * as iam from "@aws-cdk/aws-iam";

export class AwsPractice11Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const authEmailFn = new lambda.Function(this, "authEmailFn", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "index.handler",
      memorySize: 1024,
      timeout: cdk.Duration.seconds(10),
    });

    const userPool = new cognito.UserPool(this, "UserPool", {
      selfSignUpEnabled: true, // Allow users to sign up
      autoVerify: { email: true }, // Verify email addresses by sending a verification code
      signInAliases: { email: true }, // Set email as an alias means now you will use email address to authenticate not with username
      userVerification: {
        emailSubject: "Verify your email for our awesome app!",
        emailBody:
          "Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}",
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage:
          "Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}",
      }, ///customize email and sms
      lambdaTriggers: {
        preSignUp: authEmailFn, ///Trigger before the signup process to userpool
      },
    });
  }
}
