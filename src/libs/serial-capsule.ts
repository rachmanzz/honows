import { TypeSerialCapsule } from "../interfaces/serial-message";
import msgpack from "msgpack-lite";
import { verifyAudioFormat } from "./audio-verify";
import { verifyVideoFormat } from "./video-verify";

export function serialCapsule(d: TypeSerialCapsule) {
  if (d.mime === "application/json" || d.mime === "text/plain") {
    return msgpack.encode(d);
  }

  let isOk = false;
  const view = new DataView(
    d.content instanceof ArrayBuffer ? d.content : d.content.buffer
  );

  switch (true) {
    case /^audio\//.test(d.mime):
      isOk = verifyAudioFormat(d.mime, view);
      break;

    case /^video\//.test(d.mime):
      isOk = verifyVideoFormat(d.mime, view);
      break;
    default:
      isOk = false;
  }

  if (isOk) return msgpack.encode(d);
  return null;
}

export function deserialCapsule(
  d: Buffer | Uint8Array | number[]
): TypeSerialCapsule | null {
  const result = msgpack.decode(d);
  if (
    typeof result === "object" &&
    "mime" in result &&
    "content" in result &&
    typeof result.mime === "string"
  ) {
    if (result.mime === "application/json" || result.mime === "text/plain") {
      if (
        result.mime === "application/json" &&
        typeof result.content === "object"
      ) {
        return result;
      }

      if (result.mime === "text/plain" && typeof result.content === "string") {
        return result;
      }
      return null;
    }

    let isOk = false;
    const view = new DataView(
      result.content instanceof ArrayBuffer
        ? result.content
        : result.content.buffer
    );

    switch (true) {
      case /^audio\//.test(result.mime):
        isOk = verifyAudioFormat(result.mime, view);
        break;

      case /^video\//.test(result.mime):
        isOk = verifyVideoFormat(result.mime, view);
        break;
      default:
        isOk = false;
    }

    if (isOk) return result;
  }
  return null;
}
