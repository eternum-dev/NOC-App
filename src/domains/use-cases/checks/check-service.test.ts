import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";




describe('Test in check-service', () => {

    const mockRepository = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });



    test('should call successCallback when returns true', async () => {

        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));

    });
    test('should call errorCallback when returns false', async () => {

        const wasOk = await checkService.execute('https://guuasdasdgle.com');

        expect(wasOk).toBeFalsy();
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));

    });
});