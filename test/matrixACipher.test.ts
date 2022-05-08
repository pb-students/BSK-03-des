const { encrypt, decrypt } = useMatrixACipher()
const message = 'CRYPTOGRAPHYOSA'

test('encrypt with 2 column key', async () => {
  const key = '2-1'

  expect(encrypt(message, key)).toEqual('RCPYOTRGPAYHSOA')
})

test('encrypt with 4 column key', async () => {
  const key = '3-1-4-2'

  expect(encrypt(message, key)).toEqual('YCPRGTROHAYPAOS')
})

test('encrypt with 5 column key', async () => {
  const key = '3-4-1-5-2'

  expect(encrypt(message, key)).toEqual('YPCTRRAOPGOSHAY')
})
test('decrypt with 2 column key', async () => {
  const key = '2-1'

  expect(decrypt('RCPYOTRGPAYHSOA', key)).toEqual(message)
})

test('decrypt with 4 column key', async () => {
  const key = '3-1-4-2'

  expect(decrypt('YCPRGTROHAYPAOS', key)).toEqual(message)
})

test('decrypt with 5 column key', async () => {
  const key = '3-4-1-5-2'

  expect(decrypt('YPCTRRAOPGOSHAY', key)).toEqual(message)
})
