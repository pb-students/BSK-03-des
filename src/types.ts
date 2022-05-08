export class BitArray extends Array<number> {
  constructor (buffer: ArrayBuffer | number | bigint, bits = 32) {
    super()

    if (typeof buffer === 'number' || typeof buffer === 'bigint') {
        return buffer.toString(2).padStart(bits, '0').split('').map(i => +i)
    }

    return new Uint8Array(buffer).reduce((acc: number[], a: number) => {
      acc.push(...new BitArray(a, 8))
      return acc
    }, [])
  }
}

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigUint64Array
  | BitArray