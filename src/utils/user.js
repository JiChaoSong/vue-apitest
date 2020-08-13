import Cookies from 'js-cookie'

const UserId = 'user'
const Name = 'name'

export function getUserId () {
  return Cookies.get(UserId)
}

export function setUserId (id) {
  return Cookies.set(UserId, id)
}

export function removeUserId () {
  return Cookies.remove(UserId)
}

export function getName () {
  return Cookies.get(Name)
}

export function setName (name) {
  return Cookies.set(Name, name)
}

export function removeName () {
  return Cookies.remove(Name)
}
