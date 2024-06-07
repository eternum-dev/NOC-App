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
    getLogs(severityLevel: LogSeveritylevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}