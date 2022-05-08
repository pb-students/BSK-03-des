const { encrypt, decrypt } = useFileEncryption('1 + x + x ** 4', 0b0110)

test('encrypts file', async () => {
  const originalFile = new File(['test'], 'test.txt', { type: 'text/plain' })
  const encrypted = encrypt(originalFile)
  await until(encrypted).not.toBeNull()
  console.log(await encrypted.value.arrayBuffer())
})
