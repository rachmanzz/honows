import { WSContext } from "hono/ws";
export declare const createSession: (sessionID: string, ws: WSContext<unknown>) => void;
export declare const removeSession: (sessionID: string) => void;
export declare const getWs: (sessionID: string) => WSContext<unknown> | undefined;
//# sourceMappingURL=map.d.ts.map