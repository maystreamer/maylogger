import { asyncLocalStorage } from "./traceContext";

export class TraceLogger {

    public setTraceIdMiddleware() {
        return (req: any, res: any, next: any) => {
            const traceId = req.headers['x-trace-id'] || `no-trace-id`; // Extract or generate traceId
            const store = new Map<string, any>();
            store.set('traceId', traceId);
            asyncLocalStorage.run(store, () => {
                next();
            });-
            console.log("hello")
        };
    }

    public getTraceId(): string {
        const store = asyncLocalStorage.getStore();
        return store ? store.get('traceId') || 'no-trace-id' : 'no-trace-id';
    }
}