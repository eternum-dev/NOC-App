import { LogModel } from "../../data/mongo/models/log.model";
import { LogDatasource } from "../../domains/datasources/log.datasource";
import { LogEntity, LogSeveritylevel } from "../../domains/entities/log.entity";



export class MongoLogDatasource implements LogDatasource {
    async saveLogs(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);

        await newLog.save();
        console.log('log guardado:', newLog.id );
    }

    async getLogs(severityLevel: LogSeveritylevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        });

        return logs.map(LogEntity.fromObject);
    }
}