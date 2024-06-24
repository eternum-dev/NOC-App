import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domains/datasources/log.datasource";
import { LogEntity, LogSeveritylevel } from "../../domains/entities/log.entity";

const prisma = new PrismaClient();
const severityEmun = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}


export class PostgresLogDatasource implements LogDatasource {
    async saveLogs(log: LogEntity): Promise<void> {

        const levelSeverityEnum = severityEmun[log.level];
        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level: levelSeverityEnum,
            }
        });
    }

    async getLogs(severityLevel: LogSeveritylevel): Promise<LogEntity[]> {
        const level = severityEmun[severityLevel];
        const dbLogs = await prisma.logModel.findMany({
            where: { level }
        });

        return dbLogs.map(LogEntity.fromObject);
    }

}