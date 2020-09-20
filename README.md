# Inbox API

This projects spins up a mail receiver plus an API that you can retrieve received mail with.

## Prerequisites

- A domain or subdomain that you don't use for receiving mail yet
- Node v12
- AWS Account
- CDK CLI
- [Lerna](https://github.com/lerna/lerna)

## Configure it

Verify a domain with SES (Identity Management -> Domains) and update the domain in `packages/cdk/lib/inbox-api-stack.ts` accordingly.

You can use domains that are not registered in Route53, by [delegating the nameserver to a Route53 hosted zone TODO: link other article](...).

## Build and Deploy it

1. `npx lerna bootstrap`
2. `npx lerna run build`
3. `npx lerna run deploy`

Once the deployment is complete, go to the SES Email Receiving Rule Sets and set the newly create rule as the active one. 






---



There are 4 steps to deploy the solution yourself.

1. Verify a domain with SES for receiving mail
2. Check out the source code from GitHub
3. Update the domain in the CDK file TODO
4. Build and deploy it
5. Active the Rule Set

### 1. Verify a Domain for Receiving Mail

https://youtu.be/3o-PcDozNkY

### 2. Check out the Source Code From GitHub

[Check out the source code from GitHub](...).

```
git clone ...
```

### 3. Update The Domain (TODO: use an env var instead)

### 4. Build And Deploy It

### 5. Activate The Rule Set

https://youtu.be/00_sx_-SFc0

Go ahead and try it! `npm run build && npm run cdk deploy` to build and deploy the code. Send a mail to `some-random-id@your-domain.com` and within a few seconds you should see a new entry in your table.