function* lfsr (taps: Set<number>, startingState: number) {
  const max = Math.max(...taps)

  const tapsArray = [...taps]

  // NOTE: Limit startingState to only max + 1 bits
  let lfsr = startingState & ((1 << (max + 1)) - 1)

  while (true) {
    yield lfsr & 1

    // NOTE: Add missing zeros to the beginning of the binary string
    const binaryString = lfsr.toString(2).padStart(max + 1, '0')

    let bit = +binaryString[max - tapsArray[1]] ^ +binaryString[max - tapsArray[0]]
    for (const tap of tapsArray.slice(2)) {
      bit ^= +binaryString[max - tap]
    }

    lfsr >>= 1
    lfsr |= bit << max
  }
}

export default (polynomial: string, startingState: number = 0xdeadbeef) => {
  const taps = compilePolynomial(polynomial)
  return lfsr(taps, startingState)
}
