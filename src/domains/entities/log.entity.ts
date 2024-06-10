
export enum LogSeveritylevel {
    low = 'low',
    medium = 'medium',
    high = 'high',

}



export class LogEntity {

    public level: LogSeveritylevel;
    public message: string;
    public createdAt: Date;


    constructor(message: string, level: LogSeveritylevel) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }

    static fromJson = (json: string): LogEntity => {
        const { level, message, createdAt } = JSON.parse(json);
        const log = new  LogEntity(message, level);
        
        log.createdAt = new Date(createdAt); 

        return log; 
    }
}