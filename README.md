# HonoWS

HonoWS is a WebSocket library based on [Hono](https://hono.dev) that provides **session management** and **channel subscription handling**.

## ✨ Features
1. **Session Management**  
   - Store and manage WebSocket sessions
   - Assign unique session IDs to each connection
2. **Channel Subscription**  
   - Allow sessions to subscribe/unsubscribe to channels
   - Support multiple sessions in a single channel
   - Channels are removed when no active sessions remain (requires explicit unsubscribe)
3. **Channel Utilities**  
   - `ws.channels()` returns an array of active channel names
   - `ws.channelSend(channelName, data)` sends data to all subscribers in a channel
4. **Message Serialization**  
   - `serialCapsule(data)` encapsulates structured data into an optimized binary format
   - `deserialCapsule(data)` reconstructs messages from binary format using `msgpack-lite`

## 🚀 Installation
```sh
bun add https://github.com/rachmanzz/honows
```

## 📌 Usage

### 1️⃣ **Create a WebSocket Server**
```ts

import { createWs } from 'honows';
import { createBunWebSocket } from "hono/bun";

export const { upgradeWebSocket, websocket } = createBunWebSocket();

export const wsRoute = upgradeWebSocket(async (c) => {
    const ws = createWs()
    ws.onOpen = openWs.bind(ws)
    ws.onMessage = onMessage.bind(ws)
    ws.onClose = onClose.bind(ws)

    return  ws
})
```
### 2️⃣ **Session Management**
```ts
// WS Event onOpen onClose
import { createWs, HonoWSEvent} from 'honows';
import { WSContext } from "hono/ws";

// arrow function not allowed
export function onOpen(this: HonoWSEvent<unknown>, e: Event, ws: WSContext<unknown>) {
    this.sessionRegister(ws)
}

export function onClose(this: HonoWSEvent<unknown>) {
    this.sessionUnregister()
}

```

### 3️⃣ **Subscribe & Unsubscribe Channels**
```ts
ws.subscribe("chat-room-1", sessionId);
ws.unsubscribe("chat-room-1");
ws.unsubscribeAll()
```

### 4️⃣ **Channel Utilities**
```ts
const channels = ws.channels(); // Get all active channels
ws.channelSend("chat-room-1", "Hello, everyone!"); // Broadcast message to a channel
```


### 5️⃣ **Message Serialization with msgpack-lite**
HonoWS provides `serialCapsule` and `deserialCapsule` to handle efficient data serialization and deserialization using `msgpack-lite`.

#### **Serializing Messages**
```ts
import { serialCapsule, deserialCapsule } from "honows";
```

#### **SerialCapsule**
```ts
function serialCapsule(data: TypeSerialCapsule): Buffer<ArrayBufferLike> | null;
```
Encapsulates structured data into an optimized binary format. Returns `null` if the content does not match the specified MIME type.

#### **DeserialCapsule**
```ts
function deserialCapsule(data: Buffer | Uint8Array | number[]): TypeSerialCapsule | null;
```
Reconstructs messages from binary format using `msgpack-lite`. Returns `null` if deserialization fails.

#### **Supported Serial Message Types**
```ts
export type AudioSerial = {
    mime: "audio/wav" | "audio/mpeg" | "audio/ogg" | "audio/mp4",
    content: ArrayBuffer | Uint8Array,
    verifier?: string
};

export type VideoSerial = {
    mime: "video/mp4" | "video/webm" | "video/ogg" | "video/mpeg",
    content: ArrayBuffer | Uint8Array,
    verifier?: string
};

export type ObjectSerial = {
    mime: "application/json",
    content: object,
    verifier?: string
};

export type TextSerial = {
    mime: "text/plain",
    content: string,
    verifier?: string
};

export type TypeSerialCapsule = TextSerial | ObjectSerial | VideoSerial | AudioSerial;
```

## 🔥 Contribution
Pull requests are welcome! Please open an issue first if you want to add a new feature.

## 📄 License
HonoWS is licensed under the [MIT License](LICENSE).