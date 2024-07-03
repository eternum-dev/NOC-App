import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoDataBase } from "../../data/mongo/init";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeveritylevel } from "../../domains/entities/log.entity";
import { LogModel } from "../../data/mongo/models/log.model";




describe('Test is mongo-log.datasource.ts', () => {
    const logDataSource = new MongoLogDatasource();
    const log = new LogEntity({
        level: LogSeveritylevel.high,
        message: 'test message',
        origin: 'mongo-log.datasource.test.ts'
    });

    // coneccion a mongo
    beforeAll(async () => {
        await MongoDataBase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });
    });
    // elimina todos los logs creados antes de cada test
    afterEach(async () => {
        await LogModel.deleteMany();
    });
    // hace la desconeccion de mongoose 
    afterAll(async () => {
        mongoose.connection.close();
    });


    test('should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log');
        
        await logDataSource.saveLogs(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("log guardado:", expect.any(String));
    });

    test('should get a logs', async () => {
        await logDataSource.saveLogs(log);
        await logDataSource.saveLogs(log);

        const logs = await logDataSource.getLogs(LogSeveritylevel.high);
        console.log(logs);
        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeveritylevel.high);
    });

}); 