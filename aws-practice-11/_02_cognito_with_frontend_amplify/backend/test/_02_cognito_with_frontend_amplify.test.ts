import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as 02CognitoWithFrontendAmplify from '../lib/_02_cognito_with_frontend_amplify-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new 02CognitoWithFrontendAmplify.02CognitoWithFrontendAmplifyStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
