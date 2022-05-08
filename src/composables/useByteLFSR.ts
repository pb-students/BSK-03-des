const ARRAY_8 = [...Array(8)]

export default (polynomial: string, startingState: number) => {
  const lfsr = useLFSR(polynomial, startingState)

  const generator = function* () {
    while (true) {
      yield parseInt(ARRAY_8.map(() => lfsr.next().value).join(''), 2)
    }
  }

  return generator()
}
