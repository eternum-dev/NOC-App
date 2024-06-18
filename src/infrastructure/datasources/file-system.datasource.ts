import fs, { mkdir, mkdirSync } from 'fs';
import { LogDatasource } from "../../domains/datasources/log.datasource";
import { LogEntity, LogSeveritylevel } from "../../domains/entities/log.entity";



export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogPath = 'logs/logs-low.log';
    private readonly mediumLogPath = 'logs/logs-medium.log';
    private readonly highLogPath = 'logs/logs-high.log';

    constructor() {
        this.createLogFile();
    }

    private createLogFile = () => {
        if (!fs.existsSync(this.logPath)) {
            mkdirSync(this.logPath);
        }

        [this.allLogPath,
        this.mediumLogPath,
        this.highLogPath].forEach((path) => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        })
    }

    async saveLogs(log: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(log)} \n`;
        fs.appendFileSync(this.allLogPath, logAsJson);

        if (log.level === LogSeveritylevel.low) return;
        if (log.level === LogSeveritylevel.medium) {
            fs.appendFileSync(this.mediumLogPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogPath, logAsJson);
        }

    }

    private getLogsFromFiles = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf8');
        if(content === '') return [];

        const logs = content.split('\n').map(LogEntity.fromJson);

        return logs;
    }

    async getLogs(severityLevel: LogSeveritylevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeveritylevel.low:

                return this.getLogsFromFiles(this.allLogPath);
            case LogSeveritylevel.medium:

                return this.getLogsFromFiles(this.mediumLogPath);
            case LogSeveritylevel.high:

                return this.getLogsFromFiles(this.highLogPath);
            default:
                throw new Error(`${severityLevel} not implemented`)
        }
    }

}