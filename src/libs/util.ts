import type { MicroCMSDate } from "microcms-js-sdk"

export function paddingZero(value: number, digit: number) {
  const len = digit - String(value).length
  if (len > 0) {
    return `${"0".repeat(len)}${value}`
  } else {
    return `${value}`
  }
}

export function toMusicSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-")
}

export function formatDate(date: MicroCMSDate | string): string {
  const d = new Date(date as string)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}.${mm}.${dd}`
}
