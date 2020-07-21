import request from '../utils/request'

export function login (data) {
  return request({
    url: '/person/login',
    method: 'post',
    data
  })
}

export function getinfo () {
  return request({
    url: '/person/info',
    method: 'post'
  })
}

export function logout () {
  return request({
    url: '/person/logout',
    method: 'post'
  })
}

export function userList (param) {
  return request({
    url: '/person/',
    method: 'get',
    params: param
  })
}

export function userAdd (data) {
  return request({
    url: '/person/',
    method: 'post',
    data
  })
}

export function userUpdate (id, data) {
  return request({
    url: '/person/' + id + '/',
    method: 'put',
    data
  })
}

export function userDelete (id) {
  return request({
    url: '/person/' + id + '/',
    method: 'delete'
  })
}
