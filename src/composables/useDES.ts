import { get, MaybeRef } from "@vueuse/core"
import { BitArray, TypedArray } from "../types"
import { IP, IIP, SHIFT, PC, PC2, P, E, S } from "../constants-des"

// @ts-expect-error ts is shit
function permutate(array: BigUint64Array, matrix: number[]): bigint[]
function permutate(array: TypedArray, matrix: number[]): number[]
function permutate(array: number[], matrix: number[]): number[] {
  return matrix.reduce((perm: number[], index, i) => {
    perm[i] = array[index]
    return perm
  }, [])
}

function cast64BitBlock<T extends TypedArray>(to: { new (a: ArrayBuffer): T }, from: bigint): T {
  return new to(new BigUint64Array([from]).buffer)
}

export default (key = 108755180518133317n) => {
  const encrypt = async (file: MaybeRef<File>) => {
    const blocks = await use64BitBlocks(get(file))
    const blockPairs32 = [...blocks].map(block => {
      const bitBlock = permutate(new BitArray(block), IP)
      return cast64BitBlock(Uint32Array, BigInt(`0b${bitBlock.join('')}`))
    })

    const permutedChoice = permutate(cast64BitBlock(BitArray, key), PC)
    let keyC = parseInt(permutedChoice.slice(0, 28).join(''), 2)
    let keyD = parseInt(permutedChoice.slice(28).join(''), 2)

    const keys = []
    for (let i = 0; i < SHIFT.length; i++) {
      keyC <<= SHIFT[i]
      keyC &= 0xfffffff
      keyD <<= SHIFT[i]
      keyD &= 0xfffffff

      keys.push(permutate([...new BitArray(keyC, 28), ...new BitArray(keyD, 28)], PC2))
    }
    const result = []
    for (const [left, right] of blockPairs32) {
      const newBlocks: [BitArray, BitArray][] = []

      const rightBitArray = new BitArray(right)
      const leftBitArray = new BitArray(left)

      for (let i = 0; i < SHIFT.length; i++) {
        const key = keys[i]

        const rightExtended = permutate(rightBitArray, E)
          .map((bit, i) => bit ^ key[i])

        const bits32 = [...Array(8).keys()].map(i => {
          return rightExtended.slice(0 + 6 * i, 6 + 6 * i)
        }).map(([y1, x1, x2, x3, x4, y2], i) => {
          const x = parseInt([x1, x2, x3, x4].join(''), 2)
          const y = parseInt([y1, y2].join(''), 2)
          return new BitArray(S[i][y][x], 4)
        }).reduce((acc: number[], a) => [...acc, ...a], [])

        newBlocks.push([
          rightBitArray, 
          permutate(bits32, P).map((bit, i) => bit ^ leftBitArray[i])
        ])
      }

      const [leftBlock, rightBlock] = newBlocks[SHIFT.length - 1]
      result.push(BigInt(`0b${permutate([...rightBlock, ...leftBlock], IIP).join('')}`))
    }

    return new File([
      new BigUint64Array(result).buffer
    ], 'encrypted.bin', { type: 'application/octet-stream' })
  }

  const decrypt = async (file: MaybeRef<File>) => {

    const blocks = await use64BitBlocks(get(file))
    const blockPairs32 = [...blocks].map(block => {
      const bitBlock = permutate(new BitArray(block), IP)
      return cast64BitBlock(Uint32Array, BigInt(`0b${bitBlock.join('')}`))
    })

    const permutedChoice = permutate(cast64BitBlock(BitArray, key), PC)
    let keyC = parseInt(permutedChoice.slice(0, 28).join(''), 2)
    let keyD = parseInt(permutedChoice.slice(28).join(''), 2)

    const keys = []
    for (let i = 0; i < SHIFT.length; i++) {
      keyC <<= SHIFT[i]
      keyC &= 0xfffffff
      keyD <<= SHIFT[i]
      keyD &= 0xfffffff

      keys.push(permutate([...new BitArray(keyC, 28), ...new BitArray(keyD, 28)], PC2))
    }
    const reversedKeys = keys.reverse() // reversing keys for decrypt

    const result = []
    for (const [left, right] of blockPairs32) {
      const newBlocks: [BitArray, BitArray][] = []

      const rightBitArray = new BitArray(right)
      const leftBitArray = new BitArray(left)

      for (let i = 0; i < SHIFT.length; i++) {
        const key = reversedKeys[i]

        const rightExtended = permutate(rightBitArray, E)
          .map((bit, i) => bit ^ key[i])

        const bits32 = [...Array(8).keys()].map(i => {
          return rightExtended.slice(0 + 6 * i, 6 + 6 * i)
        }).map(([y1, x1, x2, x3, x4, y2], i) => {
          const x = parseInt([x1, x2, x3, x4].join(''), 2)
          const y = parseInt([y1, y2].join(''), 2)
          return new BitArray(S[i][y][x], 4)
        }).reduce((acc: number[], a) => [...acc, ...a], [])

        newBlocks.push([
          rightBitArray, 
          permutate(bits32, P).map((bit, i) => bit ^ leftBitArray[i])
        ])
      }

      const [leftBlock, rightBlock] = newBlocks[SHIFT.length - 1]
      result.push(BigInt(`0b${permutate([...rightBlock, ...leftBlock], IIP).join('')}`))
    }

    return new File([
      new BigUint64Array(result).buffer
    ], 'decrypted.bin', { type: 'application/octet-stream' })
  }

  return {
    encrypt, 
    decrypt
  }
}