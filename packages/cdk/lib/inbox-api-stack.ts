import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Table, AttributeType, BillingMode } from '@aws-cdk/aws-dynamodb';
import { ReceiptRuleSet } from '@aws-cdk/aws-ses';
import * as actions from '@aws-cdk/aws-ses-actions';

export class InboxApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domain = process.env.INBOX_DOMAIN;
    if (!domain) {
      throw Error('Please set the environment variable INBOX_DOMAIN with the domain that you want to use.')
    }

    const rawMailBucket = new Bucket(this, 'RawMail');

    const table = new Table(this, 'TempMailMetadata', {
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      sortKey: { name: 'sk', type: AttributeType.STRING },
      timeToLiveAttribute: 'ttl',
      billingMode: BillingMode.PAY_PER_REQUEST
    });

    const postProcessFunction = new Function(this, 'PostProcessor', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, '../../receiver/dist')),
      environment: {
        'TABLE': table.tableName,
      }
    });
    table.grantWriteData(postProcessFunction);

    // after deploying the cdk stack you need to activate this ruleset
    new ReceiptRuleSet(this, 'ReceiverRuleSet', {
      rules: [
        {
          recipients: [domain],
          actions: [
            new actions.S3({
              bucket: rawMailBucket
            }),
            new actions.Lambda({
              function: postProcessFunction
            })
          ],
        }
      ]
    });

    const apiFunction = new Function(this, 'ApiLambda', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, '../../api/dist')),
      environment: {
        'TABLE': table.tableName,
      }
    });
    table.grantReadData(apiFunction);

    new LambdaRestApi(this, 'InboxApi', {
      handler: apiFunction,
    });


  }
}
