export type AudioSerial = {
    mime: "audio/wav" | "audio/mpeg" | "audio/ogg" | "audio/mp4",
    content: ArrayBuffer | Uint8Array
    verifier?: string
}

export type VideoSerial = {
    mime: "video/mp4" | "video/webm" | "video/ogg" | "video/mpeg",
    content: ArrayBuffer | Uint8Array
    verifier?: string
}

export type ObjectSerial = {
    mime: "application/json",
    content: object
    verifier?: string
}

export type TextSerial = {
    mime: "text/plain",
    content: string
    verifier?: string
}

export type TypeSerialCapsule = TextSerial | ObjectSerial | VideoSerial | AudioSerial