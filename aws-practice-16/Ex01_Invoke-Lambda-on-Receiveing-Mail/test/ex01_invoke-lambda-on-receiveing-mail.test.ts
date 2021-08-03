import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Ex01InvokeLambdaOnReceiveingMail from '../lib/ex01_invoke-lambda-on-receiveing-mail-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Ex01InvokeLambdaOnReceiveingMail.Ex01InvokeLambdaOnReceiveingMailStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
