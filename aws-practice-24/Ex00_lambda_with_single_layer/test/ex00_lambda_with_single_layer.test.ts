import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Ex00LambdaWithSingleLayer from '../lib/ex00_lambda_with_single_layer-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Ex00LambdaWithSingleLayer.Ex00LambdaWithSingleLayerStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
