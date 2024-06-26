import { url } from "inspector";
import { CheckService } from "../domains/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository-impl";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domains/use-cases/email/send-email";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domains/use-cases/checks/check-service-multiple";




const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
)

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)


// const emailService = new EmailService();

export class Server {



    public static start() {
        console.log('Server starter');

        // new SendEmailLogs(emailService, logRepository)
        //     .execute('alejandro.thon.j@gmail.com');
        // emailService.sendEmailWithFileSystemLog([
        //     'alejandro.thon.j@gmail.com',
        //     'alejandro96121@hotmail.com'
        // ]);

        CronService.createJob(
            '*/5 * * * * *',

            () => {
                const url = 'https://google.com'
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is ok `),
                    (error) => console.log(error)
                ).execute(url)
            });
    }
}