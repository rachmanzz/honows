import { HonoWSEvent } from "@/interfaces/hono-event";
import { WSContext } from "hono/ws";
import { nanoid } from "nanoid";
import { createSession, getWs, removeSession } from "./session/map";
import {
  addChannelItem,
  getChannels,
  hasInChannel,
  removeChannelItem,
} from "./session/channels";

const sessionMap = new WeakMap<WeakKey, string>();
const channelsRegistered = new WeakMap<WeakKey, Set<string>>();
// this sould create inside "upgradeWebSocket", so the object not shareable
export const createWs = <T extends unknown>(): HonoWSEvent<T> => ({
  sessionRegister(this: HonoWSEvent<T>, ws: WSContext<unknown>) {
    const haSessionID = sessionMap.has(this);
    if (!haSessionID) {
      const sessionID = "wss" + nanoid(20);
      sessionMap.set(this, sessionID);
      createSession(sessionID, ws);
    }
  },
  sessionRemove(this: HonoWSEvent<T>) {
    const sessionID = sessionMap.get(this);
    if (sessionID) {
      removeSession(sessionID);
      sessionMap.delete(this);
    }
  },
  sessionID(this: HonoWSEvent<T>) {
    return sessionMap.get(this);
  },
  getWS(this: HonoWSEvent<T>) {
    const sessionID = sessionMap.get(this);
    if (sessionID) {
      return getWs(sessionID);
    }
    return undefined;
  },
  subscribe(this: HonoWSEvent<T>, channelName) {
    const sessionID = this.sessionID();
    if (sessionID) {
      addChannelItem(channelName, sessionID);

      if (!channelsRegistered.has(this)) {
        channelsRegistered.set(this, new Set());
      }
      channelsRegistered.get(this)?.add(channelName);
    }
  },
  unsubscribe(this: HonoWSEvent<T>, channelName) {
    const sessionID = this.sessionID();
    if (sessionID) {
      removeChannelItem(channelName, sessionID);
      channelsRegistered.get(this)?.delete(channelName);
    }
  },
  unsubscribeAll() {
    const sessionID = this.sessionID();
    if (sessionID && channelsRegistered.has(this)) {
      channelsRegistered.get(this)?.forEach((it) => {
        removeChannelItem(it, sessionID);
      });

      channelsRegistered.get(this)?.clear();
    }
  },
  channelSend(this: HonoWSEvent<T>, channelName, data) {
    const sessionID = this.sessionID();
    if (sessionID && hasInChannel(channelName, sessionID)) {
      getChannels(channelName)?.forEach((v) => {
        if (sessionID !== v) {
          getWs(v)?.send(data);
        }
      });
    }
  },
});
