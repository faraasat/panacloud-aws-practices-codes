import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Ex02FargateWtihAlb from '../lib/ex02_fargate_wtih_alb-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Ex02FargateWtihAlb.Ex02FargateWtihAlbStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
