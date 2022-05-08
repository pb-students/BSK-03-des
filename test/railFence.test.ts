const { encrypt, decrypt } = useRailFence()
const message = 'CRYPTOGRAPHY'

test('encrypt with n = 3', async () => {
  const n = 3
  expect(encrypt(message, n)).toEqual('CTARPORPYYGH')
})

test('encrypt with n = 4', async () => {
  const n = 4
  expect(encrypt(message, n)).toEqual('CGRORYYTAHPP')
})

test('encrypt with n = 5', async () => {
  const n = 5
  expect(encrypt(message, n)).toEqual('CARRPYGHPOYT')

})

test('encrypt with n = 6', async () => {
  const n = 6
  expect(encrypt(message, n)).toEqual('CHRPYYAPRTGO')
})

test('decrypt with n = 3', async () => {
  const n = 3
  expect(decrypt('CTARPORPYYGH', n)).toEqual(message)
})

test('decrypt with n = 4', async () => {
  const n = 4
  expect(decrypt('CGRORYYTAHPP', n)).toEqual(message)
})

test('decrypt with n = 5', async () => {
  const n = 5
  expect(decrypt('CARRPYGHPOYT', n)).toEqual(message)

})

test('decrypt with n = 6', async () => {
  const n = 6
  expect(decrypt('CHRPYYAPRTGO', n)).toEqual(message)
})
