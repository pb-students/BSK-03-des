const CHARCODE_A = 'A'.charCodeAt(0)

/**
 * Check if the Character is letter or not
 * @param {String} str - character to check
 * @return {object} An array with the character or null if isn't a letter
 */
 function isLetter (str: string) {
  return str.length === 1 && str.match(/[a-zA-Z]/i)
}
 
/**
 * Check if is Uppercase or Lowercase
 * @param {String} character - character to check
 * @return {Boolean} result of the checking
 */
function isUpperCase (character: string) {
  return character === character.toUpperCase()
}
 
/**
 * Encrypt a Vigenere cipher
 * @param {String} message - string to be encrypted
 * @param {String} key - key for encrypt
 * @return {String} result - encrypted string
 */
function encrypt (message: string, key: string) {
  let result = ''
  let keyOffset = 0

    const repeat = Math.ceil(message.length / key.length)
    key = key.repeat(repeat).slice(0, message.length)
  

  for (const char of message.toUpperCase()) {
    if (!isLetter(char)) {
      result += char
      continue
    }

    const keyCharCode = key.toUpperCase().charCodeAt(keyOffset++)
    keyOffset %= key.length

    result += String.fromCharCode((char.charCodeAt(0) + keyCharCode - 2 * CHARCODE_A) % 26 + CHARCODE_A)
  }

  return result
}
 
/**
 * Decrypt a Vigenere cipher
 * @param {String} message - string to be decrypted
 * @param {String} key - key for decrypt
 * @return {String} result - decrypted string
 */
function decrypt (message: any, key: any) {
  let result = ''
  let keyOffset = 0

  const repeat = Math.ceil(message.length / key.length)
    key = key.repeat(repeat).slice(0, message.length)

  for (const char of message.toUpperCase()) {
    if (!isLetter(char)) {
      result += char
      continue
    }

    const keyCharCode = key.toUpperCase().charCodeAt(keyOffset++)
    keyOffset %= key.length

    result += String.fromCharCode(90 - (25 - (char.charCodeAt(0) - keyCharCode)) % 26)
  }

  return result
}

export default () => ({
  encrypt,
  decrypt
})