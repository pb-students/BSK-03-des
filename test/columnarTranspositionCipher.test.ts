const { encrypt, decrypt } = useColumnarTranspositionCipher()
const message = 'HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION'
const key = 'CONVENIENCE'

test('encrypt', async () => {
  expect(encrypt(message, key)).toEqual('HECRNCEYIISEPSGDIRNTOAAESRMPNSSROEEBTETIAEEHS')
})

test('decrypt', async () => {
  expect(decrypt('HECRNCEYIISEPSGDIRNTOAAESRMPNSSROEEBTETIAEEHS', key))
    .toEqual(message.replace(/ +/g, ''))
})

test('encrypt with message shorter than key', async () => {
  expect(encrypt('CONVENIENC', key)).toEqual('CCEEINNNOV')
})

test('decrypt with message shorter than key', async () => {
  // NOTE: Due to the message being shorter than the key, the output cannot be deciphered correctly
  expect(decrypt('CCEEINNNOV', key)).toEqual('CVNENNEOCI')
})
