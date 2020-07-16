import request from '../utils/request'

export function apiinfoList (param) {
  return request({
    url: '/apiinfo/',
    method: 'get',
    params: param
  })
}

export function apiinfoAdd (data) {
  return request({
    url: '/apiinfo/',
    method: 'post',
    data
  })
}

export function apiinfoUpdate (id, data) {
  return request({
    url: '/apiinfo/' + id + '/',
    method: 'put',
    data
  })
}

export function apiinfoDelete (id) {
  return request({
    url: '/apiinfo/' + id + '/',
    method: 'delete'
  })
}
