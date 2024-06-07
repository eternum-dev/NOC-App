import { LogEntity, LogSeveritylevel } from "../entities/log.entity";




export abstract class LogRepository {
    abstract saveLogs(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeveritylevel): Promise<LogEntity[]>;
}