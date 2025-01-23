import { Duration, Stack } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';

/**
 * Builds and configures the necessary AWS Lambda functions and their associated resources.
 *
 * @param stack - The AWS CDK stack in which the resources will be defined.
 * @param lastProcessedTable - The DynamoDB table used to store the last processed data.
 * @returns An object containing the created Lambda function.
 *
 * @remarks
 * This function creates a Lambda function that fetches data from Truth Social and writes it to Bluesky.
 * The Lambda function is granted read/write permissions to the specified DynamoDB table.
 * Additionally, a CloudWatch rule is created to schedule the Lambda function to run every minute.
 */
const buildFunctions = (stack: Stack, lastProcessedTable: Table) => {
  const chromeLambdaLayer = LayerVersion.fromLayerVersionArn(stack, `${stack.stackName}ChromiumLayer`, process.env.CHROMIUM_LAYER_ARN!);

  /**
   * Lambda function that fetches data from Truth Social and writes it to bsky
   */
  const fetchLambda = new NodejsFunction(stack, `${stack.stackName}FetchLambda`, {
    functionName: `${stack.stackName}Fetch`,
    entry: './lib/functions/fetch.src.ts',
    handler: 'handler',
    runtime: Runtime.NODEJS_22_X,
    timeout: Duration.minutes(5),
    environment: {
      TABLE_NAME: lastProcessedTable.tableName,
      GEMINI_CREDENTIALS: process.env.GEMINI_CREDENTIALS!,
      BLUESKY_USERNAME: process.env.BLUESKY_USERNAME!,
      BLUESKY_PASSWORD: process.env.BLUESKY_PASSWORD!,
      SLACK_URL: process.env.SLACK_URL!,
    },
    logRetention: RetentionDays.ONE_WEEK,
    layers: [chromeLambdaLayer],
    memorySize: 1024,
    bundling: {
      externalModules: ['@sparticuz/chromium'],
    },
  });

  /**
   * Grant R/W permissions
   */
  lastProcessedTable.grantReadWriteData(fetchLambda);

  /**
   * Schedule the Lambda function to run every minute
   */
  new Rule(stack, `${stack.stackName}FetchScheduleRule`, {
    ruleName: `${stack.stackName}FetchSchedule`,
    schedule: Schedule.rate(Duration.minutes(5)),
    targets: [new LambdaFunction(fetchLambda)],
  });

  return { fetchLambda };
};

export { buildFunctions };
