import Cookies from 'js-cookie'

const UserId = 'user'

export function getUserId () {
  return Cookies.get(UserId)
}

export function setUserId (id) {
  return Cookies.set(UserId, id)
}

export function removeUserId () {
  return Cookies.remove(UserId)
}
