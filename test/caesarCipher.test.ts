const { encrypt: encrypt, decrypt: decrypt } = useCaesarCipher()
const message = 'CRYPTOGRAPHY'

test('encrypt with k = 2', async () => {
  const key = 2

  expect(encrypt(message, key)).toEqual('ETARVQITCRJA')
})

test('encrypt with k = 3', async () => {
  const key = 3

  expect(encrypt(message, key)).toEqual('FUBSWRJUDSKB')
})

test('encrypt with k = 4', async () => {
  const key = 4

  expect(encrypt(message, key)).toEqual('GVCTXSKVETLC')
})

test('encrypt with k = 5', async () => {
  const key = 5

  expect(encrypt(message, key)).toEqual('HWDUYTLWFUMD')
})

test('decrypt with k = 2', async () => {
  const key = 2

  expect(decrypt('ETARVQITCRJA', key)).toEqual(message)
})

test('decrypt with k = 3', async () => {
  const key = 3

  expect(decrypt('FUBSWRJUDSKB', key)).toEqual(message)
})

test('decrypt with k = 4', async () => {
  const key = 4

  expect(decrypt('GVCTXSKVETLC', key)).toEqual(message)
})

test('decrypt with k = 5', async () => {
  const key = 5

  expect(decrypt('HWDUYTLWFUMD', key)).toEqual(message)
})

