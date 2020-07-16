import request from '../utils/request'

export function systemList (param) {
  return request({
    url: '/system/',
    method: 'get',
    params: param
  })
}

export function systemAdd (data) {
  return request({
    url: '/system/',
    method: 'post',
    data
  })
}

export function systemUpdate (id, data) {
  return request({
    url: '/system/' + id + '/',
    method: 'put',
    data
  })
}

export function systemDelete (id) {
  return request({
    url: '/system/' + id + '/',
    method: 'delete'
  })
}
