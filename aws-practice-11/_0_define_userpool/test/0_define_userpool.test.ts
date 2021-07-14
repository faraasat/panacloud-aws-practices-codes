import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as 0DefineUserpool from '../lib/0_define_userpool-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new 0DefineUserpool.0DefineUserpoolStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
