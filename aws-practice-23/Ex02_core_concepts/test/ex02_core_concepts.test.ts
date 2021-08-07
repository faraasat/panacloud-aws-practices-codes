import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Ex02CoreConcepts from '../lib/ex02_core_concepts-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Ex02CoreConcepts.Ex02CoreConceptsStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
