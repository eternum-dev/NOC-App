import { EmailService, SendEmailOptions } from "./email.service";
import nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';



describe('Test in email.service.ts', () => {

    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });
    const emailservice = new EmailService();
    const email = 'alejandro.thon.j@gmail.com';

    test('should send email', async () => {


        const options: SendEmailOptions = {
            to: email,
            subject: 'test',
            htmlbody: `<h1>hola mundo test</h1>`
        };

        const emailSent = await emailservice.sendEmail(options);

        expect(emailSent).toBeTruthy();
        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>hola mundo test</h1>",
            subject: "test",
            to: email
        });
    });

    test('should send email with attachments', async () => {
        await emailservice.sendEmailWithFileSystemLog(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "log de sistema",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { fileName: 'logs-all.log', path: 'logs/logs-low.log' },
                { fileName: 'logs-medium.log', path: 'logs/logs-medium.log' },
                { fileName: 'logs-high.log', path: 'logs/logs-high.log' }])
        });
    });
});