"use strict";var e=require("./helper.cjs");exports.verifyAudioFormat=(r,c)=>{switch(r){case"audio/wav":return e.checkMagicNumber(c,0,[82,73,70,70]);case"audio/mpeg":return e.checkMagicNumber(c,0,[73,68,51]);case"audio/ogg":return e.checkMagicNumber(c,0,[79,103,103,83]);case"audio/mp4":return e.checkMagicNumber(c,4,[102,116,121,112]);default:return!1}};
