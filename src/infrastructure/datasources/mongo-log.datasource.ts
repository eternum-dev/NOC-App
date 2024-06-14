import { logModel } from "../../data/mongo/models/log.model";
import { LogDatasource } from "../../domains/datasources/log.datasource";
import { LogEntity, LogSeveritylevel } from "../../domains/entities/log.entity";



export class MongoLogDatasource implements LogDatasource {
    async saveLogs(log: LogEntity): Promise<void> {

        const newLog = await logModel.create(log);
        await newLog.save();
        console.log('Mongo log Create', newLog);
    }

    async getLogs(severityLevel: LogSeveritylevel): Promise<LogEntity[]> {
        const logs = await logModel.find({
            level: severityLevel
        });

        return logs.map(LogEntity.fromObject);
    }
}