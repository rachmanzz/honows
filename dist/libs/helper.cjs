"use strict";exports.checkMagicNumber=function(t,e,r){for(let n=0;n<r.length;n++)if(t.getUint8(e+n)!==r[n])return!1;return!0};
