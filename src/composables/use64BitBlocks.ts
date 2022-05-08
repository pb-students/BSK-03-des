export default async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const fillBlocks = (8 - arrayBuffer.byteLength % 8) || 8

  const buffer = new Uint8Array(arrayBuffer.byteLength + fillBlocks)
  buffer.set(new Uint8Array(arrayBuffer), 0)
  buffer.set(new Uint8Array(
    [...Array(fillBlocks)].map((_, i) => i === fillBlocks - 1 ? fillBlocks : 0)), 
    arrayBuffer.byteLength
  )

  return new BigUint64Array(buffer.buffer)
}