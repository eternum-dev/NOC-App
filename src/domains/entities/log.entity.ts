
export enum LogSeveritylevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogSeveritylevel;
    message: string;
    createdAt?: Date;
    origin: string;
}



export class LogEntity {

    public level: LogSeveritylevel;
    public message: string;
    public createdAt: Date;
    public origin: string;


    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options;

        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string ): LogEntity => {

        json = (json == '') ? '{}' : json; 

        const { level, message, createdAt, origin } = JSON.parse(json);
        const log = new LogEntity({ message, level, createdAt, origin });

        return log;
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { level, message, createdAt, origin } = object;
        const log = new LogEntity({ level, message, createdAt, origin });

        return log; 
    }
}