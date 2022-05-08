const { encrypt, decrypt } = useVigenereCipher()
const message = 'CRYPTOGRAPHY'

test('encrypt1', async () => {
  const key = 'BREAKBREAKBR'
  expect(encrypt(message, key)).toEqual('DICPDPXVAZIP')
})

test('decrypt1', async () => {
  const key = 'BREAKBREAKBR'
  expect(decrypt('DICPDPXVAZIP', key)).toEqual(message)
})

test('encrypt2', async () => {
  const key = 'POLITECHNIKA'
  expect(encrypt(message, key)).toEqual('RFJXMSIYNXRY')
})

test('decrypt2', async () => {
  const key = 'POLITECHNIKA'
  expect(decrypt('RFJXMSIYNXRY', key)).toEqual(message)
})

test('encrypt with key shorter than message', async () => {
  const key = 'POLITECHNIK'
  expect(encrypt(message, key)).toEqual('RFJXMSIYNXRN')
})

test('decrypt with key shorter than message', async () => {
  const key = 'POLITECHNIK'
  expect(decrypt('RFJXMSIYNXRN', key)).toEqual(message)
})

test('encrypt with key longer than message', async () => {
  const key = 'POLITECHNIKAA'
  expect(encrypt(message, key)).toEqual('RFJXMSIYNXRY')
})

test('decrypt with key longer than message', async () => {
  const key = 'POLITECHNIKAA'
  expect(decrypt('RFJXMSIYNXRY', key)).toEqual(message)
})