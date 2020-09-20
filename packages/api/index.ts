
import { APIGatewayProxyHandler } from 'aws-lambda'
import { Mail } from './model';

export const handler: APIGatewayProxyHandler = async(event) => {
    const queryParams = event.queryStringParameters;
    const recipient = queryParams?.recipient;
    if (!recipient) {
        return {
            statusCode: 400,
            body: 'Missing query parameter: recipient'
        }
    }
    const beginsWith = queryParams.since || '';
    const limit = +queryParams.limit || 1;

    const mail = (await Mail.query(
        recipient,
        {
            beginsWith,
            limit
        }
    )).Items;

    return {
        statusCode: 200,
        body: JSON.stringify(mail)
    }
}