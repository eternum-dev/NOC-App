import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domains/repository/log.repository';
import { LogEntity, LogSeveritylevel } from '../../domains/entities/log.entity';
// import { Attachment } from 'nodemailer/lib/mailer';


interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlbody: string;
    attachments?: Attachment[]
}

interface Attachment {
    fileName: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });
    constructor(

    ) {

    }
    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        const { to, subject, htmlbody, attachments = [] } = options;

        try {
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlbody,
                attachments
            });
            console.log(sendInformation);

            const log = new LogEntity({
                level: LogSeveritylevel.medium,
                message: 'email sent',
                origin: 'email.service.ts'
            });
           


            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeveritylevel.high,
                message: 'email not sent',
                origin: 'email.service.ts'
            });
           


            return false
        }
    }

    sendEmailWithFileSystemLog(to: string | string[]) {
        const subject = 'log de sistema';
        const htmlbody = `
        <h3>log de sistema - NOC </h3>
        <p>este es el primer parrafo para que probar el mail</p>
        <p>este es el segundo parrafo para que probar el mail</p>`;
        const attachments: Attachment[] = [
            { fileName: 'logs-all.log', path: 'logs/logs-low.log' },
            { fileName: 'logs-medium.log', path: 'logs/logs-medium.log' },
            { fileName: 'logs-high.log', path: 'logs/logs-high.log' }
        ];
        return this.sendEmail({ subject, htmlbody, to, attachments });
    }

}