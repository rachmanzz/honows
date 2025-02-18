import { checkMagicNumber } from "./helper";

export function verifyVideoFormat(mime: string, view: DataView): boolean {
    switch (mime) {
        case "video/mp4":
            return checkMagicNumber(view, 4, [0x66, 0x74, 0x79, 0x70]);

        case "video/webm":
            return checkMagicNumber(view, 0, [0x1a, 0x45, 0xdf, 0xa3]);
        
        case "video/ogg":
            return checkMagicNumber(view, 0, [0x4f, 0x67, 0x67, 0x53]);
        
        case "video/mpeg":
            if (checkMagicNumber(view, 0, [0x00, 0x00, 0x01, 0xba])) {
                return true;
            }
            if (view.getUint8(0) === 0x47 && view.getUint8(188) === 0x47) {
                return true;
            }
            // looping may need
            return false;

        default:
            return false;
    }
}
