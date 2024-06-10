import { LogEntity, LogSeveritylevel } from "../../domains/entities/log.entity";
import { LogRepository } from "../../domains/repository/log.repository";
import { LogDatasource } from '../../domains/datasources/log.datasource';


// la idea pricipal de esta parte del codigo es poder cambiar el datasourse.

export class LogRepositoryImpl implements LogRepository {


    constructor(
        private readonly LogDatasource: LogDatasource // <-- aqui cambiamos el datasource mediante I-D injeccion de dependencias
    ) {

    }


    async saveLogs(log: LogEntity): Promise<void> {
       return this.LogDatasource.saveLogs(log);
    }
    async getLogs(severityLevel: LogSeveritylevel): Promise<LogEntity[]> {
        return this.LogDatasource.getLogs(severityLevel);
    }

}