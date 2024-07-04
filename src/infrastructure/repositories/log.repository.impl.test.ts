import { LogEntity, LogSeveritylevel } from "../../domains/entities/log.entity";
import { LogRepository } from '../../domains/repository/log.repository';
import { LogRepositoryImpl } from "./log.repository-impl";





describe('Test in log.repositry-impl.ts', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockLogDAtasource = {
        saveLogs: jest.fn(),
        getLogs: jest.fn()
    }
    const logRepository = new LogRepositoryImpl(mockLogDAtasource);

    const dataLog = {
        message: 'test-message',
        level: LogSeveritylevel.medium,
        origin: 'log.repository-impl.test.ts'
    };
    const newLog = new LogEntity(dataLog);

    test('saveLogs should call the datasource with arguments ', async () => {
        await logRepository.saveLogs(newLog);

        expect(mockLogDAtasource.saveLogs).toHaveBeenCalledWith(newLog);
    });

    test('saveLogs should call the datasource with arguments ', async () => {
        await logRepository.getLogs(LogSeveritylevel.medium);

        expect(mockLogDAtasource.getLogs).toHaveBeenCalledWith(LogSeveritylevel.medium);
    });
}); 