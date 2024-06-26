import { LogEntity, LogSeveritylevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";




describe('test in log.datasource.ts', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeveritylevel.medium
    });

    class MockLogDatasource implements LogDatasource {
        async saveLogs(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeveritylevel): Promise<LogEntity[]> {
            return [newLog];
        }
    }

    test('should test the abstract class', async () => {
        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(mockLogDatasource).toHaveProperty('saveLogs');
        expect(mockLogDatasource).toHaveProperty('getLogs');


        await mockLogDatasource.saveLogs(newLog);
        const log = await mockLogDatasource.getLogs(LogSeveritylevel.medium); 

        expect(log).toHaveLength(1);
        expect(log[0]).toBeInstanceOf(LogEntity)
    });

}); 