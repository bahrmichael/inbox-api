#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { InboxApiStack } from '../lib/inbox-api-stack';

const app = new cdk.App();
new InboxApiStack(app, 'InboxApiStack');
