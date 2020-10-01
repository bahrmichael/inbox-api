# Inbox API

Companion article: [Validate Email Workflows with a Serverless Inbox API](https://bahr.dev/2020/09/29/validate-email-workflows/)

The solution consists of two parts. The email receiver and the api that lets you access the received mail. The first writes to the database, the latter reads from it.

![Architecture Overview](https://github.com/bahrmichael/bahrmichael.github.io/raw/master/pictures/2020/tempmail/inbox-api.png)

## Prerequisites

- A domain or subdomain that you don't use for receiving mail yet
- Node v12+
- AWS Account
- [CDK CLI](https://aws.amazon.com/cdk/)

## Configure it

[Verify a domain with SES](https://youtu.be/3o-PcDozNkY) (Identity Management -> Domains) and pass the domain with the environment variable `INBOX_DOMAIN`.

You can use domains that are not registered in Route53, by [delegating the nameserver to a Route53 hosted zone](https://bahr.dev/2020/09/01/multiple-frontends/).

## Build and Deploy it

1. `npx lerna bootstrap`
2. `npx lerna run build`
3. `(cd packages/cdk && INBOX_DOMAIN=yourdomain.com npm run deploy)`

This will create one CloudFormation stack called `InboxApiStack`.

Once the deployment is complete, go to the SES Email Receiving Rule Sets and [set the newly create rule as the active one](https://youtu.be/00_sx_-SFc0).

## Test it

Send a mail to `whatever@yourdomain.com` and check if there's a new file in the bucket and a new record in the database. Run a GET request against `https:// YOUR_API_ENDPOINT/?recipient=whatever@yourdomain.com`

# License

MIT