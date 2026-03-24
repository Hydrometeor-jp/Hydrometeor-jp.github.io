export function paddingZero(value: number, digit: number) {
  const len = digit - String(value).length
  if (len > 0) {
    return `${"0".repeat(len)}${value}`
  } else {
    return `${value}`
  }
}
