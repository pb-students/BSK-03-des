const isKeyValid = (key: string) => /^(?:\d+-)*\d+$/.test(key)
  && key.split('-')
    .map(i => +i)
    .sort((a, b) => a - b)
    .reduce((acc, a , b) => acc && a === b + 1, true)

const encrypt = (message: string, key: string) => {
  if (!isKeyValid(key)) throw new Error('Invalid key')

  const indexes = key.split('-').map((i: any) => i - 1)
  const matrix = messageToMatrix(message, indexes.length)
  return transpose(indexes.map(i => matrix[i])).flat().join('')
}

const decrypt = (message: string, key: string) => {
  if (!isKeyValid(key)) throw new Error('Invalid key')

  const indexes = key.split('-').map((i: any) => i - 1)
  const matrix = messageToMatrix(message, indexes.length)

  // NOTE: We're joining characters after transposing to remove nulls in the array
  const transposed = transpose(matrix)
    .map((row: string[]) => row.join(''))

  const result = []
  for (const line of transposed) {
    // NOTE: We're removing the biggest indexes from the line to fix the uneven last line
    const skip = indexes.map(i => i).sort((a, b) => b - a)
    skip.length = indexes.length - line.length
    const filteredIndexes = indexes.filter(i => !skip.includes(i))

    const decryptedRow = filteredIndexes
      .map((strength, i) => ({ strength, char: line[i] }))
      .sort((a, b) => a.strength - b.strength)
      .map(({ char }) => char)

    result.push(decryptedRow)
  }

  return result.flat().join('')
}

export default () => ({
  encrypt,
  decrypt
})

