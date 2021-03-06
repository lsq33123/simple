import Cookies from 'js-cookie'

const TokenKey = 'YSAdmin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTokenLocal() {
  return localStorage.getItem(TokenKey)
}

export function setTokenLocal(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeTokenLocal() {
  return localStorage.removeItem(TokenKey)
}
