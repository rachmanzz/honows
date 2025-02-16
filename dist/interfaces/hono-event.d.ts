import type { WSEvents, WSContext } from "hono/ws";
export type HonoWSEvent = WSEvents<unknown> & {
    sub_id?: string;
    sessionRegister: (ws: WSContext<unknown>) => void;
    sessionRemove: (sessionID: string) => void;
    sessionID: () => string | undefined;
    getWS: () => WSContext<unknown> | undefined;
};
//# sourceMappingURL=hono-event.d.ts.map