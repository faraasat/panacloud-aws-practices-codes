import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Ex02CiCdPipelineUpdateCdkTemplate from '../lib/ex02_ci_cd_pipeline_update_cdk_template-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Ex02CiCdPipelineUpdateCdkTemplate.Ex02CiCdPipelineUpdateCdkTemplateStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
