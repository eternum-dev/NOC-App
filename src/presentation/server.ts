import { url } from "inspector";
import { CheckService } from "../domains/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository-impl";
import { CronService } from "./cron/cron.service";



const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)


export class Server {

    public static start() {
        console.log('Server starter');


        CronService.createJob(
            '*/5 * * * * *',

            () => {
                const url = 'https://localhost:3000'
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok `),
                    (error) => console.log(error)
                ).execute(url)
            });
    }
}