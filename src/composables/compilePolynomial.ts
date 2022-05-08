const EXPRESSION_REGEX = /^x\s*\*\*\s*(\d+)$/

export default (polynomialString: string): Set<number> => {
  const exponents = new Set<number>()
  let hasConstantOne = false
  for (const expression of polynomialString.split('+').map(e => e.trim())) {
    switch (expression) {
      case '1':
        hasConstantOne = true
				break;

      case 'x':
				exponents.add(0)
				break;

      default: 
				if (!EXPRESSION_REGEX.test(expression)) throw new Error(`Invalid expression: ${expression}`)

				const exponent = +(expression.match(EXPRESSION_REGEX)?.[1] ?? 0) - 1
				if (exponent < 0) throw new Error(`Invalid expression: Exponent cannot be less or equal than 0: ${expression}`)
				if (exponents.has(exponent)) throw new Error(`Invalid expression: Exponent already exists: ${expression}`)
				exponents.add(exponent)
		}
	}

  if (!hasConstantOne) {
    throw new Error(`Invalid polynomial: Polynomial has to include a constant '1'`)
  }

  if (exponents.size < 2) {
    throw new Error(`Invalid polynomial: Polynomial has to include at least 2 expressions with x`)
  }

	return exponents
}
