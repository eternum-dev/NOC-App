
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
}