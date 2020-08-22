#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TempMailBackendStack } from '../lib/temp-mail-backend-stack';

const app = new cdk.App();
new TempMailBackendStack(app, 'TempMailBackendStack');
