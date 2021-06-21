export function validateEmail(email: any, options: string) {
  // eslint-disable-next-line
  let re = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/gi
  let value = String(email).toLowerCase()
  if (options && options.trim) {
    value = value.trim()
  }

  return re.test(value)
}
