import type { WSEvents, WSContext } from "hono/ws";
import { WSSession } from "./ws-session";

export type HonoWSEvent = WSEvents<unknown> & {
    session: WSSession
    sessionRegister: (ws: WSContext<unknown>) => void
    sessionRemove: (sessionID: string) => void
};