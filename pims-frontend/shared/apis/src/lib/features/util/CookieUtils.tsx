'use client'

function setCookie(
  name: string,
  value: string,
  days: number,
  path = '/',
  domain?: string,
  secure = false,
) {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }

  let cookieString = `${name}=${value || ''}${expires}; path=${path};`

  if (domain) {
    cookieString += ` domain=${domain};`
  }

  if (secure) {
    cookieString += ' secure;'
  }

  document.cookie = cookieString
}

function getCookie(name: string) {
  if (typeof window === 'undefined') {
    return null
  }

  const nameEQ = `${name}=`
  const cookiesArray: string[] = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i]?.trim()
    if (cookie && cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length)
    }
  }

  return null
}

function deleteCookie(
  name: string,
  path = '/',
  domain?: string,
  secure = false,
) {
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`

  // domain이 설정되어 있다면 추가
  if (domain) {
    cookieString += ` domain=${domain};`
  }

  // secure가 true일 경우 추가
  if (secure) {
    cookieString += ' secure;'
  }

  document.cookie = cookieString
}

export { setCookie, getCookie, deleteCookie }
