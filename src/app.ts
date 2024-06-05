import { CronService } from "./presentation/cron/cron.service";
import { Server } from "./presentation/server";



(() => {
    main();
})();

function main() {
    Server.start();

    CronService.createJob('* * * * * *', ()=> console.log('object'));
}
