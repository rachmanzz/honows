import type { WSEvents, WSContext } from "hono/ws";
export type HonoWSEvent<T extends unknown> = WSEvents<T> & {
    sub_id?: string;
    sessionRegister: (ws: WSContext<unknown>) => void;
    sessionRemove: (sessionID: string) => void;
    sessionID: () => string | undefined;
    getWS: () => WSContext<unknown> | undefined;
    subscribe: (channelName: string) => void;
    unsubscribe: (channelName: string) => void;
    channelSend: (channelName: string, data: string | ArrayBuffer) => void;
};
//# sourceMappingURL=hono-event.d.ts.map