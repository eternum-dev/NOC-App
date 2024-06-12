import { LogEntity, LogSeveritylevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCases {
    execute(url: string): Promise<boolean>
}
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

const fileOrigin = 'check.service.ts';

export class CheckService implements CheckServiceUseCases {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    public async execute(url: string) {

        const { high, low } = LogSeveritylevel;

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);

            }
            const log = new LogEntity({
                message: `Service ${url} working`,
                level: low,
                origin: fileOrigin
            });

            this.logRepository.saveLogs(log)
            this.successCallback();

            return true;
        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogEntity({
                message: errorMessage,
                level: high,
                origin: fileOrigin
            });

            this.logRepository.saveLogs(log);
            this.errorCallback(`${error}`);

            return false;
        }

    }
}