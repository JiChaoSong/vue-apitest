import request from '../utils/request'

export function apiinfoList (param) {
  return request({
    url: '/apiinfo/',
    method: 'get',
    params: param
  })
}

export function getapiinfo (id) {
  return request({
    url: '/apiinfo/' + id + '/',
    method: 'get'
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

export function apiinfoRun (data) {
  return request({
    url: '/apiinfo/run',
    method: 'post',
    data
  })
}

export function apiinfoImport (data) {
  return request({
    url: '/apiinfo/import',
    method: 'post',
    data
  })
}

export function apiinfoTest (data) {
  return request({
    url: '/apiinfo/test',
    method: 'post',
    data
  })
}
