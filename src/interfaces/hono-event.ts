import type { WSEvents, WSContext } from "hono/ws";

export type HonoWSEvent <T extends unknown>= WSEvents<T> & {
  sub_id?: string;
  sessionRegister: (ws: WSContext<unknown>) => void;
  sessionUnregister: () => void;
  sessionID: () => string | undefined;
  getWS: () => WSContext<unknown> | undefined;
  subscribe: (channelName: string) => void;
  unsubscribe: (channelName: string) => void;
  unsubscribeAll: () => void;
  channelSend:(channelName: string, data: string | ArrayBuffer | Uint8Array) => void;
  channels: () => Set<string> | undefined
};
