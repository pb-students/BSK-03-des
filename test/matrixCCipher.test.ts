const { encrypt, decrypt } = useMatrixCCipher()
const message = 'HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION'
const key = 'CONVENIENCE'

test('encrypt', async () => {
  expect(encrypt(message, key)).toEqual('HEESPNIRRSSEESEIYASCBTEMGEPNANDICTRTAHSOIEERO')
})


test('decrypt', async () => {
  expect(decrypt('HEESPNIRRSSEESEIYASCBTEMGEPNANDICTRTAHSOIEERO', key))
    .toEqual(message.replace(/ +/g, ''))
})

test('encrypt with empty columns', async () => {
  const key = 'BARCACZTERYZEROEZ'
  expect(encrypt(message, key)).toEqual('EECMEETASCYNHRSETGRISESNBOAITENSIREEDISHAPPRO')
})

test('decrypt with empty columns', async () => {
  const key = 'BARCACZTERYZEROEZ'
  expect(decrypt('EECMEETASCYNHRSETGRISESNBOAITENSIREEDISHAPPRO', key))
    .toEqual(message.replace(/ +/g, ''))
})
