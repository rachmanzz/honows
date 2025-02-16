import { HonoWSEvent } from "@/interfaces/hono-event";
import { WSContext } from "hono/ws";
import { nanoid } from "nanoid";
import { createSession, getWs, removeSession } from "./session/map";

const sessionMap = new WeakMap<WeakKey, string>();
// this sould create inside "upgradeWebSocket", so the object not shareable
export const createWs = (): HonoWSEvent => ({
  sessionRegister(this: HonoWSEvent, ws: WSContext<unknown>) {
    const haSessionID = sessionMap.has(this);
    if (!haSessionID) {
      const sessionID = "wss" + nanoid(20);
      sessionMap.set(this, sessionID);
      createSession(sessionID, ws);
    }
  },
  sessionRemove(this: HonoWSEvent) {
    const sessionID = sessionMap.get(this);
    if (sessionID) {
      removeSession(sessionID);
      sessionMap.delete(this);
    }
  },
  sessionID(this: HonoWSEvent) {
    return sessionMap.get(this);
  },
  getWS(this: HonoWSEvent) {
    const sessionID = sessionMap.get(this);
    if (sessionID) {
      return getWs(sessionID);
    }
    return undefined;
  },
});
