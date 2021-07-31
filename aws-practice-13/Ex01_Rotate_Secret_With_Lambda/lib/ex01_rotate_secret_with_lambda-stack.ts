import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as lambda from "@aws-cdk/aws-lambda";
import * as secretsmanager from "@aws-cdk/aws-secretsmanager";

export class Ex01RotateSecretWithLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const secret = new secretsmanager.Secret(this, "Secret", {
      description: "My Secret",
      secretName: "myNewSecret",
      generateSecretString: {
        secretStringTemplate: JSON.stringify({}),
        generateStringKey: "SecretKey",
      },
    });

    const secretValue = secretsmanager.Secret.fromSecretNameV2(
      this,
      "SecretValueID",
      secret.secretName
    ).secretValue;

    const lambdaFn = new lambda.Function(this, `ExampleLambdaAssetFn`, {
      code: lambda.Code.fromInline(
        'exports.handler = function(event, ctx, cb) { console.log("SECRET_KEY", process.env.EXAMPLE_SECRET_KEY); return cb(null, "hi"); }'
      ),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
    });

    lambdaFn.addEnvironment("EXAMPLE_SECRET_KEY", secretValue.toString());

    // This lambda function will be envoked
    const lambdaFunc = new lambda.Function(this, "LambdaSecretRotate", {
      functionName: "lambda-keys-rotate",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"),
      environment: {
        REGION: cdk.Stack.of(this).region,
        SECRET_NAME: "myNewSecret",
        KEY_IN_SECRET_NAME: "randomkey",
      },
    });

    // Call this lambdaFunc after given time
    secret.addRotationSchedule("RotationSchedule", {
      rotationLambda: lambdaFunc,
      automaticallyAfter: cdk.Duration.hours(24),
    });

    secret.grantRead(lambdaFunc);

    lambdaFunc.grantInvoke(
      new iam.ServicePrincipal("secretsmanager.amazonaws.com")
    );

    lambdaFunc.addToRolePolicy(
      new iam.PolicyStatement({
        resources: [secret.secretArn],
        actions: ["secretsmanager:PutSecretValue"],
      })
    );
  }
}
