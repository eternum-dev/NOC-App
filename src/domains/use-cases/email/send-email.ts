import { error } from 'console';
import { EmailService } from '../../../presentation/email/email.service';
import { LogRepository } from '../../repository/log.repository';
import { LogEntity, LogSeveritylevel } from '../../entities/log.entity';
interface SendLogEmailUsecase {
    execute: (to: string | string[]) => Promise<boolean>
}


export class SendEmailLogs implements SendLogEmailUsecase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(to: string | string[]) {

        try {
            const sent = await this.emailService.sendEmailWithFileSystemLog(to);
            if (!sent) {
                throw new Error('email not set');
            }

            const log = new LogEntity({
                level: LogSeveritylevel.low,
                message: "log email sent",
                origin: 'send-email.ts'
            });

            this.logRepository.saveLogs(log);

            return true;

        } catch (error) {
            const log = new LogEntity({
                level: LogSeveritylevel.high,
                message: `${error}`,
                origin: 'send-email.ts'
            });

            this.logRepository.saveLogs(log);

            return false;
        }


    }
}