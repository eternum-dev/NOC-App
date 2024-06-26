import { connect } from "mongoose";


interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}


export class MongoDataBase {


    static async connect(options: ConnectionOptions) {
        const { mongoUrl, dbName } = options;

        try {
            await connect(mongoUrl, { dbName });

            return true;
        } catch (error) {
            console.log('mogoose connection error');
            throw error;
        }
    }
}