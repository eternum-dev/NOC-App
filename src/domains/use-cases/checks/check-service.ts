
interface CheckServiceUseCases {
    execute(url: string): Promise<boolean>
}
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCases {
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    public async execute(url: string) {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);

            }
            this.successCallback();
    
            return true;
        } catch (error) {
            this.errorCallback(`${error}`);
            console.error(error);
        }
        return false;
    }
}