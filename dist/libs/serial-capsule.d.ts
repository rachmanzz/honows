import { TypeSerialCapsule } from "../interfaces/serial-message";
export declare function serialCapsule(d: TypeSerialCapsule): Buffer<ArrayBufferLike> | null;
export declare function deserialCapsule(d: Buffer | Uint8Array | number[]): TypeSerialCapsule | null;
//# sourceMappingURL=serial-capsule.d.ts.map