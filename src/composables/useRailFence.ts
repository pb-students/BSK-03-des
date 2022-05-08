const encrypt = (message: string, rows: number) => {
  const res: string[][] = [...Array(rows).keys()].map(() => [])
  for (let i = 0; i < message.length; ++i) {
    const k = i % (rows * 2 - 2)
    res[k < rows ? k : rows - (k % rows + 1) - 1][i] = message[i]
  }

  return res.flat().join('')
}

const decrypt = (message: string, rows: number) => {
  const res: string[][] = [...Array(rows).keys()].map(() => [])
  let directory = null;
  let row = 0;
  let col = 0;
  
  for(let i = 0; i < message.length; i++){
    if(row === 0){
      directory = true
    }
    if(row === rows - 1){
      directory = false;
    }
    res[row][col] = '*'
    col = col + 1

    if(directory){
      row++
    }
    else{
      row--
    }
  }

  let index = 0
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < message.length; j++){
      if(res[i][j] === '*' && index < message.length){
        res[i][j] = message[index];
        index = index + 1
      }
    }
  }
  let result = []
  row = 0
  col = 0
  for(let i = 0; i < message.length; i++){
    if(row === 0){
      directory = true
    }
    if(row === rows - 1){
      directory = false;
    }

    if(res[row][col] != '*'){
      result.push(res[row][col])
      col++ 
    }

    if(directory){
      row++ 
    }
    else{
      row--
    }
  }
  return result.flat().join('');
}


export default () => ({
  encrypt,
  decrypt
})
