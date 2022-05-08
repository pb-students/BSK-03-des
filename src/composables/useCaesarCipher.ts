function mod(n: number, m: number) {
  return ((n % m) + m) % m;                                 //wlasna funkcja modulo dzialajaca dla ujemnych liczb
}


const encrypt = (message: string, key: number) => {
    const alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = ''
    message = message.toUpperCase();
    for(let i = 0 ; i < message.length; i++){
        let index = alphabet.indexOf(message[i])                  //szukamy indeksu literki w alfabecie
        
        result = result + alphabet[mod((+index + +key),26)]       // wybieramy zaszyfrowana litere wg wzoru
        
    }
    return result;

  }
 
  
  const decrypt = (message: string, key: number) => {
    return encrypt(message, key * -1)                               //tutaj poprostu zaszyfrowana wiadomosc szyfrujemy w druga strone i dostajemy odszyfrowana, nie wiem czy tak mozna
  }                                                                        

export default () => ({
  encrypt,
  decrypt
})
