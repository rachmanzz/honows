import { checkMagicNumber } from "./helper";

export const verifyAudioFormat = (mime: string, view: DataView): boolean => {
    switch (mime) {
      case "audio/wav":
        return checkMagicNumber(view, 0, [0x52, 0x49, 0x46, 0x46]);
  
      case "audio/mpeg":
        return checkMagicNumber(view, 0, [0x49, 0x44, 0x33]);
  
      case "audio/ogg":
        return checkMagicNumber(view, 0, [0x4f, 0x67, 0x67, 0x53]); 
  
      case "audio/mp4":
        return checkMagicNumber(view, 4, [0x66, 0x74, 0x79, 0x70]);
  
      default:
        return false;
    }
  };
  