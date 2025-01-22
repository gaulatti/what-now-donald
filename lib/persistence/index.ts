import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';

/**
 * Creates and configures the necessary DynamoDB tables for the given stack.
 *
 * @param stack - The AWS CloudFormation stack to which the tables will be added.
 * @returns An object containing the created tables.
 */
const buildTables = (stack: Stack) => {
  /**
   * Creates a new DynamoDB table to store the last processed account and its metadata.
   */
  const lastProcessedTable = new Table(stack, `${stack.stackName}LastProcessedTable`, {
    partitionKey: { name: 'account', type: AttributeType.STRING },
    tableName: `${stack.stackName}LastProcessed`,
    removalPolicy: RemovalPolicy.DESTROY,
  });

  return { lastProcessedTable };
};

export { buildTables };
