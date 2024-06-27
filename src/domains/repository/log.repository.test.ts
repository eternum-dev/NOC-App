import { LogEntity, LogSeveritylevel } from "../entities/log.entity";
import { LogRepository } from "./log.repository";



describe('Test in log.repository.ts', () => {
    const dataLog = {
        origin: 'log.entity.test.ts',
        message: 'test-message-log.entity',
        level: LogSeveritylevel.high
    }
    const newLog = new LogEntity(dataLog);

    class MockLogRepository implements LogRepository {
        async saveLogs(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeveritylevel): Promise<LogEntity[]> {
            return [newLog];
        }
    }


    test('should the abstract class', async () => {

        const mockLogRepository = new MockLogRepository();

        expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
        expect(mockLogRepository).toHaveProperty('saveLogs');
        expect(mockLogRepository).toHaveProperty('getLogs');

        await mockLogRepository.saveLogs(newLog);
        const logObteined = await mockLogRepository.getLogs(LogSeveritylevel.high);

        expect(logObteined).toHaveLength(1);
        expect(logObteined[0]).toBeInstanceOf(LogEntity)
    });
});