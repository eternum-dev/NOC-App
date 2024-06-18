import { envs } from "./config/plugins/envs.plugin";
import { MongoDataBase } from "./data/mongo";
import { logModel } from "./data/mongo/models/log.model";
import { Server } from "./presentation/server";



(async () => {
  await main();
})();

async function main() {

  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  });

  // crear una coleccion = tables, coleccion =  registro 

  // const newLog = await logModel.create({
  //   level: 'low',
  //   message: 'Test message desde mongo',
  //   origin: 'app.ts'
  // }); 

  // await newLog.save();

  // console.log(newLog);

  Server.start();
  // console.log({ envs });
}
