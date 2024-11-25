/**
 * YYYY.MM.DD' 형식으로 변환
 * string -> string
 */
export function stringToDate(date: string) {
  const formattedDate = `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6)}`
  return formattedDate
}

/**
 * first
 */
export function convertStringToDate(dateString: string): Date {
  const year = parseInt(dateString.substring(0, 4))
  const month = parseInt(dateString.substring(4, 6)) - 1 // 월은 0부터 시작하므로 1을 빼줍니다
  const day = parseInt(dateString.substring(6, 8))
  return new Date(year, month, day)
}
