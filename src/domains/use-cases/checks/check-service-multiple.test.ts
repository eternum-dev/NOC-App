import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";




describe('Test in check-service-multiple.ts', () => {

    const mockRepositoryMongo = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepositoryPostgres = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepositoryFileSystem = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepositoryMongo, mockRepositoryPostgres, mockRepositoryFileSystem],
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('should call successCallback when returns true', async () => {

        const wasOk = await checkServiceMultiple.execute('https://google.com');

        expect(wasOk).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepositoryMongo.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepositoryPostgres.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepositoryFileSystem.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test('should call successCallback when returns true', async () => {

        const wasOk = await checkServiceMultiple.execute('https://googasdasdale.com');

        expect(wasOk).toBeFalsy();
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepositoryMongo.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepositoryPostgres.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepositoryFileSystem.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
    });
}); 