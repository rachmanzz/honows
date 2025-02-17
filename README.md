# HonoWS

HonoWS is a WebSocket library based on [Hono](https://hono.dev) that provides **session management** and **channel subscription handling**.

## ✨ Features
1. **Session Management**  
   - Store and remove WebSocket sessions
   - Track WebSocket connections with unique sessions
2. **Channel Subscription**  
   - Allow sessions to subscribe/unsubscribe to channels
   - Support multiple sessions in a single channel
   - Auto-cleanup of empty channels for memory efficiency

## 🚀 Installation
```sh
npm install https://github.com/rachmanzz/honows
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
    this.sessionRemove()
}

```

### 3️⃣ **Subscribe & Unsubscribe Channels**
```ts
ws.subscribe("chat-room-1", sessionId);
ws.unsubscribe("chat-room-1");
```

## 🔥 Contribution
Pull requests are welcome! Please open an issue first if you want to add a new feature.

## 📄 License
HonoWS is licensed under the [MIT License](LICENSE).

