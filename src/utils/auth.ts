export function generateOTP() {
  const digits = '0123456789'
  let OTP = ''
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }

  return OTP
}

export function generateCode() {
  const codeCharacters = '0123456789abcdefghijklmnopqrstuvwxyz'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += codeCharacters[Math.floor(Math.random() * 10)]
  }
  return code
}
