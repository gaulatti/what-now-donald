import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { buildFunctions } from './functions';
import { buildTables } from './persistence';

/**
 * Represents the WhatNowDonaldStack which extends the AWS CDK Stack.
 * This stack is responsible for setting up the necessary resources for the application.
 *
 * @remarks
 * The stack initializes by creating tables and functions required for the application.
 *
 * @param scope - The scope in which this stack is defined.
 * @param id - The unique identifier for this stack.
 * @param props - Optional properties for the stack.
 *
 * @example
 * ```typescript
 * const app = new cdk.App();
 * new WhatNowDonaldStack(app, 'WhatNowDonaldStack');
 * ```
 */
export class WhatNowDonaldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const { lastProcessedTable } = buildTables(this);
    const { fetchLambda } = buildFunctions(this, lastProcessedTable);
  }
}
