import mimedb from 'mime-db'
import { get } from "@vueuse/core"

export default (polynomial: MaybeRef<string>, startingState: MaybeRef<number>) => {
  const encrypt = async (file: MaybeRef<File>) => {
    const lfsr = useByteLFSR(
      get(polynomial), 
      get(startingState)
    )

    const byteArray = new Uint8Array(await file.arrayBuffer())

    // NOTE: We're attaching a MIME type header
    const header = Uint8Array.from(Array.from(get(file).type + ';').map(letter => letter.charCodeAt(0)))

    return new File([
      header.map(byte => byte ^ lfsr.next().value),
      byteArray.map(byte => byte ^ lfsr.next().value),
    ], 'encrypted.bin', { type: 'application/octet-stream' })
  }

  const decrypt = async (file: MaybeRef<File>) => {
    const lfsr = useByteLFSR(
      get(polynomial), 
      get(startingState)
    )

    const byteArray = new Uint8Array(await file.arrayBuffer())
    const decrypted = byteArray.map(byte => byte ^ lfsr.next().value)
    const separatorIndex = decrypted.indexOf(';'.charCodeAt(0))

    const type = [...decrypted.slice(0, separatorIndex)].map(charCode => String.fromCharCode(charCode)).join('')
    return new File(
      [decrypted.slice(1 + separatorIndex)], 
      `decrypted.${mimedb[type]?.extensions[0] ?? 'bin' }`, 
      { type: type in mimedb ? type : 'application/octet-stream' }
    )
  }

  return {
    encrypt,
    decrypt
  }
}
