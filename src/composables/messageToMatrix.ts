export default (message: string, length: number) => message.split('').reduce((accumulator: any[][], char, index) => {
  accumulator[index % length] ??= []
  accumulator[index % length].push(char)
  return accumulator
}, [])