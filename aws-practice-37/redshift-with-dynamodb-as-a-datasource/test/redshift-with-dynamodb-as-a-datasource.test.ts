import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as RedshiftWithDynamodbAsADatasource from '../lib/redshift-with-dynamodb-as-a-datasource-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new RedshiftWithDynamodbAsADatasource.RedshiftWithDynamodbAsADatasourceStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
