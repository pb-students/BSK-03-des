test('transpose 3x3 matrix', () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]

  expect(transpose(matrix)).to.deep.equal([
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ])
})

test('transpose 3x3 matrix with empty last value', () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8],
  ]

  expect(transpose(matrix)).to.deep.equal([
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, null],
  ])
})

test('transpose 3x3 matrix with half-empty last column', () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7],
  ]

  expect(transpose(matrix)).to.deep.equal([
    [1, 4, 7],
    [2, 5, null],
    [3, 6, null],
  ])
})

test('transpose 4x2 matrix', () => {
  const matrix = [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8]
  ]

  expect(transpose(matrix)).to.deep.equal([
    [1, 3, 5, 7],
    [2, 4, 6, 8]
  ])
})

test('transpose 4x2 matrix with half-empty column', () => {
  const matrix = [
    [1, 2],
    [3, 4],
    [5],
    [7]
  ]

  expect(transpose(matrix)).to.deep.equal([
    [1, 3, 5, 7],
    [2, 4, null, null]
  ])
})

test('transpose 2x4 matrix with empty last value', () => {
  const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7],
  ]

  expect(transpose(matrix)).to.deep.equal([
    [1, 5],
    [2, 6],
    [3, 7],
    [4, null]
  ])
})
