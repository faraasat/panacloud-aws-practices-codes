import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as RedshiftWithS3AsADatasource from '../lib/redshift-with-s3-as-a-datasource-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new RedshiftWithS3AsADatasource.RedshiftWithS3AsADatasourceStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
