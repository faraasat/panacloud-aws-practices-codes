import * as cdk from '@aws-cdk/core';
import {Bucket} from '@aws-cdk/aws-s3';

export class AwsPractice1Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Bucket(this, 'MyFirstBucket', { // this represent this class
      versioned: true,  // To enable version control
    });

    // The code that defines your stack goes here
  }
}
