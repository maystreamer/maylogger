export class Message {
    private message:        string;
    private traceId:        string;
    private parameters:     any[];
    private cause?:         Error;
    private isDebugEnabled: boolean;

    static msg(message: string, traceId: string, ...parameters: any[]): Message {
        return new Message(message, traceId, parameters);
    }

    static msgWithCause(cause: Error, message: string, traceId: string, ...parameters: any[]): Message {
        const msg = new Message(message, traceId, parameters);
        msg.setCause(cause);
        return msg;
    }

    constructor(message: string, traceId:string, parameters: any[] = []) {
        this.message        = message;
        this.parameters     = parameters;
        this.traceId        = traceId;
        this.isDebugEnabled = process.env.IS_DEBUG_ENABLED?.toLowerCase() === 'true' || false;
    }

    // Format the message with the parameters
    getFormattedMessage(): string {
        return this.message.replace(/{(\d+)}/g, (match, number) => {
            let arg = this.parameters[number];
            if (arg === 'undefined'){
                return match;
            } else if (typeof arg === 'object' && this.isDebugEnabled) {
                arg = JSON.stringify(arg);
            }
            let err = this.getCause();
            if (err instanceof Error) {
                arg = `${arg}\n${err.stack}`;
            }
            return arg;
        });
    }

    getMessage(): string {
        return this.message;
    }

    setMessage(message: string): void {
        this.message = message;
    }

    getTraceId(): string {
        return this.traceId;
    }
    setTraceId(value: string) {
        this.traceId = value;
    }

    getParameters(): any[] {
        return this.parameters;
    }

    setParameters(messageParameters: any[]): void {
        this.parameters = messageParameters;
    }

    getCause(): Error | undefined {
        return this.cause;
    }

    setCause(cause: Error): void {
        this.cause = cause;
    }
}