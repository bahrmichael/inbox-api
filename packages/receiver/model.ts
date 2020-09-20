import { Table, Entity } from 'dynamodb-toolbox';

// Require AWS SDK and instantiate DocumentClient
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
const DocumentClient = new DynamoDB.DocumentClient();

// Instantiate a table
export const MailTable = new Table({
  // Specify table name (used by DynamoDB)
  name: process.env.TABLE,

  // Define partition and sort keys
  partitionKey: 'pk',
  sortKey: 'sk',

  // Add the DocumentClient
  DocumentClient
});

export const Mail = new Entity({
    name: 'Mail',
  
    attributes: {
      id: { partitionKey: true }, // email alias
      sk: { hidden: true, sortKey: true, default: (data: any) => `${data.timestamp}#${data.from}` },
      timestamp: { type: 'string' },
      from: { type: 'string' },
      to: { type: 'string' },
      subject: { type: 'string' },
      ttl: { type: 'number' },
    },
  
    table: MailTable
  });