import path from "path";
import fs from 'fs';
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeveritylevel } from "../../domains/entities/log.entity";
import { SeverityLevel } from "@prisma/client";



describe('Test in file-system.datasource.ts', () => {
    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    });


    test('should create a log file if they not exist', () => {
        new FileSystemDatasource();
        const files = fs.readdirSync(logPath);

        expect(files).toEqual(['logs-high.log', 'logs-low.log', 'logs-medium.log']);
    });

    test('should save a log in  log-low.log', () => {
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeveritylevel.low,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts'
        });

        logDataSource.saveLogs(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log))
    });

    test('should save a log in  log-low.log and log-medium.log', () => {
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeveritylevel.medium,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts'
        });

        logDataSource.saveLogs(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in  log-low.log and log-high.log', () => {
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeveritylevel.high,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts'
        });

        logDataSource.saveLogs(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    });

    test('should return all logs', async () => {
        const logDataSource = new FileSystemDatasource();

        const logLow = new LogEntity({
            level: LogSeveritylevel.low,
            message: 'test-message-low',
            origin: 'log-low'
        });
        const logMedium = new LogEntity({
            level: LogSeveritylevel.medium,
            message: 'test-message-medium',
            origin: 'log-medium'
        });
        const logHigh = new LogEntity({
            level: LogSeveritylevel.high,
            message: 'test-message-high',
            origin: 'log-high'
        });


        await logDataSource.saveLogs(logLow);
        await logDataSource.saveLogs(logMedium);
        await logDataSource.saveLogs(logHigh);

        const logsLow = await logDataSource.getLogs(LogSeveritylevel.low);
        const logsMedium = await logDataSource.getLogs(LogSeveritylevel.medium);
        const logsHigh = await logDataSource.getLogs(LogSeveritylevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
    });
});  