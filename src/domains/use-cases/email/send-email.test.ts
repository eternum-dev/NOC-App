import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email";





describe('Test in send-email.ts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockEmailService = {
        sendEmailWithFileSystemLog: jest.fn().mockReturnValue(true),
    };

    const mockLogRepository: LogRepository = {
        saveLogs: jest.fn(),
        getLogs: jest.fn()
    };

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    );


    test('should call send-email with saveLogs', async () => {

        const result = await sendEmailLogs.execute('alejandro.thon.j@gmail.com');

        expect(result).toBeTruthy();
        expect(mockEmailService.sendEmailWithFileSystemLog).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "log email sent",
            origin: "send-email.ts"
        });
    });


    test('should log case error ', async () => {
        mockEmailService.sendEmailWithFileSystemLog.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('alejandro.thon.j@gmail.com');

        expect(result).toBeFalsy();
        expect(mockEmailService.sendEmailWithFileSystemLog).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "high",
            message: "Error: email not set",
            origin: "send-email.ts"
        });
    });
});