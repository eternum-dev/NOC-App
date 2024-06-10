import { LogEntity, LogSeveritylevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCases {
    execute(url: string): Promise<boolean>
}
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCases {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    public async execute(url: string) {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);

            }
            const log = new LogEntity(`Service ${url} working`, LogSeveritylevel.low);

            this.logRepository.saveLogs(log)
            this.successCallback();

            return true;
        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogEntity(errorMessage, LogSeveritylevel.high);

            this.logRepository.saveLogs(log);
            this.errorCallback(`${error}`);

            return false;
        }

    }
}