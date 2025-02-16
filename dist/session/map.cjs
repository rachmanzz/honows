"use strict";const e=new Map;exports.createSession=(s,t)=>{e.set(s,t)},exports.getWs=s=>e.get(s),exports.removeSession=s=>{e.delete(s)};
