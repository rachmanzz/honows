"use strict";var e=require("msgpack-lite"),t=require("./audio-verify.cjs"),i=require("./video-verify.cjs");exports.deserialCapsule=function(n){const o=e.decode(n);if("object"==typeof o&&"mime"in o&&"content"in o&&"string"==typeof o.mime){if("application/json"===o.mime||"text/plain"===o.mime)return"application/json"===o.mime&&"object"==typeof o.content||"text/plain"===o.mime&&"string"==typeof o.content?o:null;let e=!1;const n=new DataView(o.content instanceof ArrayBuffer?o.content:o.content.buffer);switch(!0){case/^audio\//.test(o.mime):e=t.verifyAudioFormat(o.mime,n);break;case/^video\//.test(o.mime):e=i.verifyVideoFormat(o.mime,n);break;default:e=!1}if(e)return o}return null},exports.serialCapsule=function(n){if("application/json"===n.mime||"text/plain"===n.mime)return e.encode(n);let o=!1;const r=new DataView(n.content instanceof ArrayBuffer?n.content:n.content.buffer);switch(!0){case/^audio\//.test(n.mime):o=t.verifyAudioFormat(n.mime,r);break;case/^video\//.test(n.mime):o=i.verifyVideoFormat(n.mime,r);break;default:o=!1}return o?e.encode(n):null};
