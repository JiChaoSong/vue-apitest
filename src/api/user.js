import request from '../utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getinfo () {
  return request({
    url: '/user/info',
    method: 'post'
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function userList (param) {
  return request({
    url: '/user/',
    method: 'get',
    params: param
  })
}

export function userAdd (data) {
  return request({
    url: '/user/',
    method: 'post',
    data
  })
}

export function userUpdate (id, data) {
  return request({
    url: '/user/' + id + '/',
    method: 'put',
    data
  })
}

export function userDelete (id) {
  return request({
    url: '/user/' + id + '/',
    method: 'delete'
  })
}
