import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Ex01LambdaDestinationWithDifferentDestinations from '../lib/ex01_lambda_destination_with_different_destinations-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Ex01LambdaDestinationWithDifferentDestinations.Ex01LambdaDestinationWithDifferentDestinationsStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
