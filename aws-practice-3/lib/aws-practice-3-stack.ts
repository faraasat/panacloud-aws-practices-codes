import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'
import * as cloudfront from '@aws-cdk/aws-cloudfront'
import * as origins from '@aws-cdk/aws-cloudfront-origins'

export class AwsPractice3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, "websiteBucket", {
      versioned: true
    })

    const distribution = new cloudfront.Distribution(this, "Distribution", {  // We are creating Distribution on CloudFront
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket)  // Its default behaviour is that it will lead us to s3 bucket
      },
      defaultRootObject: "index.html"  // The file which it has to access first. In s3 every file is stored as object. It tells when we are redirected from cloudfront url on s3 bucket so which file we will access
    })

    new cdk.CfnOutput(this, "DistributionDomainName", {  // To out put the given value
      value: distribution.domainName
    })

    new s3deploy.BucketDeployment(this, "DeployWebsite", {  // To deploy a websit on bucket
      sources: [s3deploy.Source.asset("./website")],   // Source path of Website
      destinationBucket: websiteBucket,  // On which Bucket to deploy on
      distribution: distribution,
      distributionPaths: ["/*"]
    })

  }
}
