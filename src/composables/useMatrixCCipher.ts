const createIndexes = (key: string) => key.toUpperCase().split('')
  .map((char, index) => ({ char, index, code: char.charCodeAt(0) }))
  .sort((a, b) => a.code - b.code)
  .map((entry, index) => ({ ...entry, strength: index }))

const createTable = (message: string, indexes: { index: number }[]) => {
  const table: string[] = ['']
  for (const char of message.replace(/ +/g, '')) {
    const i = table.length - 1
    const { index } = indexes[i]

    table[i] += char
    if (index + 1 === table[i].length) {
      table.push('')
    }
  }

  return table.map(str => str.split(''))
}


const encrypt = (message: string, key: string) => {
  const indexes = createIndexes(key)
  const table = createTable(message, indexes)

  const matrix = transpose(table)
  return indexes.map(i => matrix[i.index]).flat().join('')
}

const decrypt = (message: string, key: string) => {
  const indexes = createIndexes(key)

  const table = createTable(message, indexes)
  if (!table.slice(-1)[0].length) table.pop()

  const letters = message.split('')
  const wordLengths = transpose(table)
    .map((arr: string[]) => arr.reduce((acc, e) => acc + +(e !== null), 0))

  const words = indexes.map(i => wordLengths[i.index]) .map(length => letters.splice(0, length).join(''))
  for (const [x, word] of Object.entries(words)) {
    let y = 0
    for (const char of word) {
      const { index } = indexes[+x]
      while (!table[y][index]) y += 1
      table[y][index] = char
      y += 1
    }
  }

  return table.flat().join('')
}

export default () => ({
  encrypt,
  decrypt
})
