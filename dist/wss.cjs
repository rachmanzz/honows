"use strict";var s=require("nanoid"),e=require("./session/map.cjs");const t=new WeakMap;exports.createWs=()=>({sessionRegister(i){if(!t.has(this)){const n="wss"+s.nanoid(20);t.set(this,n),e.createSession(n,i)}},sessionRemove(){const s=t.get(this);s&&(e.removeSession(s),t.delete(this))},sessionID(){return t.get(this)},getWS(){const s=t.get(this);if(s)return e.getWs(s)}});
