import { WSContext } from "hono/ws";

const sessions = new Map<string, WSContext<unknown>>();

export const createSession = (sessionID: string, ws: WSContext<unknown>) => {
  sessions.set(sessionID, ws);
};

export const removeSession = (sessionID: string) => {
  sessions.delete(sessionID)
}
