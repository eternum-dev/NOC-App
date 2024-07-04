import { CronService } from "./cron.service";


describe('Test in cron.service.ts ', () => {

    const mockTicks = jest.fn();

    test('should first', (done) => {
        const job = CronService.createJob('* * * * * *', mockTicks);

        setTimeout(() => {
            expect(mockTicks).toHaveBeenCalledTimes(2);
            job.stop();
            
            done();
        }, 2000);
    });


});