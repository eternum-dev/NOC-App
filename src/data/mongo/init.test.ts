import mongoose from "mongoose";
import { MongoDataBase } from "./init";




describe('Pruebas en init.test.ts', () => {

    afterAll(()=> {
        mongoose.connection.close();
    });


    test('should connect to MongoDB', async () => {
        const connected = await MongoDataBase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });

        expect(connected).toBeTruthy();
        console.log(connected);
    });

    test('should throw an error ', async () => {

        try {
            const connected = await MongoDataBase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: 'mongodb://alejandro:1234568712@localhost:27018'
            });
            expect(true).toBeFalsy();
        } catch (error) {
 
        }

    });
});  