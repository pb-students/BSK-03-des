test('has no constant one', async () => {
  const fn = () => compilePolynomial('x + x ** 2')
  expect(fn).toThrow()
})

test('has unwanted chars', async () => {
  const fn = () => compilePolynomial('1 + x + x ** -2')
  expect(fn).toThrow()
})

test('has less than 2 taps', async () => {
  const fn = () => compilePolynomial('1 + x')
  expect(fn).toThrow()
})

test('compile with spaces', async () => {
  const output = compilePolynomial('1 + x + x ** 2')
  expect(output).toEqual(new Set([0, 1]))
})

test('compile without spaces', async () => {
  const output = compilePolynomial('1+x+x**2')
  expect(output).toEqual(new Set([0, 1]))
})

test('compile with exponents (no spaces)', async () => {
  const output = compilePolynomial('1 + x**4 + x')
  expect(output).toEqual(new Set([0, 3]))
})
