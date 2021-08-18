import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as JsClientLibraryForAuroraServerlessDataApi from '../lib/js-client-library-for-aurora-serverless-data-api-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new JsClientLibraryForAuroraServerlessDataApi.JsClientLibraryForAuroraServerlessDataApiStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
