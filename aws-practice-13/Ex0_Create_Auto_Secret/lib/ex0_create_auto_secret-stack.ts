import * as cdk from "@aws-cdk/core";
import * as secretsmanager from "@aws-cdk/aws-secretsmanager";
import * as lambda from "@aws-cdk/aws-lambda";

export class Ex0CreateAutoSecretStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // to generate secret value
    const secret = new secretsmanager.Secret(this, "Secret", {
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: "aamir",
          password: "12345",
        }),
        generateStringKey: "randomKey", // to generate random key
      },
    });

    const secretValue = secretsmanager.Secret.fromSecretNameV2(
      this,
      "SecretValueID",
      secret.secretName
    ).secretValue;

    // Same as above but using arn
    // const secretValue = secretsmanager.Secret.fromSecretAttributes(
    //   this,
    //   "ExampleSecretKey",
    //   {
    //     secretArn: secret.secretArn,
    //   }
    // ).secretValue;

    // to use this secret in lambda
    const lambdaFn = new lambda.Function(this, `ExampleLambdaAssetFn`, {
      // We can write this inline lambda code properly using fromAsset
      code: lambda.Code.fromInline(
        'exports.handler = function(event, ctx, cb) { console.log("SECRET_KEY", process.env.EXAMPLE_SECRET_KEY); return cb(null, "hi"); }'
      ),
      runtime: lambda.Runtime.NODEJS_12_X,
      // environment: {
      //   EXAMPLE_SECRET_KEY: secretValue.toString(),
      // },
      handler: "index.handler",
    });

    // Same as we used in environment
    lambdaFn.addEnvironment("EXAMPLE_SECRET_KEY", secretValue.toString());
  }
}
