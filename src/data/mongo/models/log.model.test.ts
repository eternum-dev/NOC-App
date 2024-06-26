import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDataBase } from "../init";
import { logModel } from "./log.model";


describe('pruebas en log.model', () => {
    beforeAll(async () => {
        await MongoDataBase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });
    });

    afterAll(() => {
        mongoose.connection.close();
    });


    test('should return logModel', async () => {
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low'
        }

        const log = await logModel.create(logData);

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }));


        await logModel.findByIdAndDelete(log.id);
    });

    test('should return  schema object', () => {
        const schema = logModel.schema.obj;
        expect(schema).toEqual(expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            origin: { type: expect.any(Function) },
            level: {
                type: expect.any(Function),
                enum: ['low', 'medium', 'high'],
                default: 'low'
            },
            createdAt: expect.any(Object) 
        }))
    });
});
