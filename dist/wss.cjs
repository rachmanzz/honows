"use strict";var s=require("nanoid"),e=require("./session/map.cjs"),t=require("./session/channels.cjs");const n=new WeakMap,i=new WeakMap;exports.createWs=()=>({sessionRegister(t){if(!n.has(this)){const i="wss"+s.nanoid(20);n.set(this,i),e.createSession(i,t)}},sessionUnregister(){const s=n.get(this);s&&(e.removeSession(s),n.delete(this))},sessionID(){return n.get(this)},getWS(){const s=n.get(this);if(s)return e.getWs(s)},subscribe(s){const e=this.sessionID();e&&(t.addChannelItem(s,e),i.has(this)||i.set(this,new Set),i.get(this)?.add(s))},unsubscribe(s){const e=this.sessionID();e&&(t.removeChannelItem(s,e),i.get(this)?.delete(s))},unsubscribeAll(){const s=this.sessionID();s&&i.has(this)&&(i.get(this)?.forEach((e=>{t.removeChannelItem(e,s)})),i.get(this)?.clear())},channels(){return i.get(this)},channelSend(s,n){const i=this.sessionID();i&&t.hasInChannel(s,i)&&t.getChannels(s)?.forEach((s=>{i!==s&&e.getWs(s)?.send(n)}))}});
