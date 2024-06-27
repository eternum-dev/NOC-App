import { LogEntity, LogSeveritylevel } from "./log.entity";


describe('Test in log.entity.ts', () => {

    const dataLog = {
        origin: 'log.entity.test.ts',
        message: 'test-message-log.entity',
        level: LogSeveritylevel.high
    }

    test('should create a logEntity instance ', () => {
        const log = new LogEntity(dataLog);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataLog.message);
        expect(log.origin).toBe(dataLog.origin);
        expect(log.level).toBe(dataLog.level);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a instance logEntity from json', () => {
        const json = `{"level":"high","message":"https://localhost:3000 is not ok. TypeError: fetch failed","createdAt":"2024-06-11T15:45:20.004Z","origin":"check.service.ts"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("https://localhost:3000 is not ok. TypeError: fetch failed");
        expect(log.origin).toBe("check.service.ts");
        expect(log.level).toBe(LogSeveritylevel.high);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should  create a instance logEntity from json', () => {
        const log = LogEntity.fromObject(dataLog);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataLog.message);
        expect(log.origin).toBe(dataLog.origin);
        expect(log.level).toBe(dataLog.level);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
});