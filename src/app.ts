import { error } from "console";
import { CheckService } from "./domains/use-cases/checks/check-service";
import { CronService } from "./presentation/cron/cron.service";
import { Server } from "./presentation/server";



(() => {
  main();
})();

function main() {
  Server.start();

  CronService.createJob('*/5 * * * * *', () => {
    new CheckService(
      () => console.log('success'),
      (error) => console.log(error)
    ).execute('https://google.com')
  });
}
