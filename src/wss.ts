import { HonoWSEvent } from "@/interfaces/hono-event";
import { WSContext } from "hono/ws";
import { nanoid } from "nanoid";
import { createSession, removeSession } from "./session/map";

export const createWs = (): HonoWSEvent => ({
  session: {},
  sessionRegister(this: HonoWSEvent, ws: WSContext<unknown>) {
    const sessionID = "wss" + nanoid(20);
    this.session.session_id = sessionID;
    createSession(sessionID, ws);
  },
  sessionRemove(this: HonoWSEvent) {
    removeSession(this.session.session_id ?? "");
    this.session.session_id = undefined;
    this.session.session_sub = undefined;
  },
});