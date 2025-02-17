import{nanoid as s}from"nanoid";import{getWs as e,removeSession as t,createSession as i}from"./session/map.mjs";import{hasInChannel as n,getChannels as o,removeChannelItem as h,addChannelItem as r}from"./session/channels.mjs";const c=new WeakMap,a=new WeakMap,m=()=>({sessionRegister(e){if(!c.has(this)){const t="wss"+s(20);c.set(this,t),i(t,e)}},sessionRemove(){const s=c.get(this);s&&(t(s),c.delete(this))},sessionID(){return c.get(this)},getWS(){const s=c.get(this);if(s)return e(s)},subscribe(s){const e=this.sessionID();e&&(r(s,e),a.has(this)||a.set(this,new Set),a.get(this)?.add(s))},unsubscribe(s){const e=this.sessionID();e&&(h(s,e),a.get(this)?.delete(s))},unsubscribeAll(){const s=this.sessionID();s&&a.has(this)&&(a.get(this)?.forEach((e=>{h(e,s)})),a.get(this)?.clear())},channelSend(s,t){const i=this.sessionID();i&&n(s,i)&&o(s)?.forEach((s=>{i!==s&&e(s)?.send(t)}))}});export{m as createWs};
