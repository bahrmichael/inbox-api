
import { SESHandler } from 'aws-lambda'
import { Mail } from './model';

export const handler: SESHandler = async(event) => {

    for (const record of event.Records) {
        const mail = record.ses.mail;
    
        const from = mail.source;
        const subject = mail.commonHeaders.subject;
        const timestamp = mail.timestamp;

        const now = new Date();
        // set the ttl as 7 days into the future and 
        // strip milliseconds (ddb expects seconds for the ttl)
        const ttl = now.setDate(now.getDate() + 7) / 1000;

        for (const to of mail.destination) {
            await Mail.put({
                id: to, timestamp,
                from, to,
                subject, ttl
            });
        }

    }
}