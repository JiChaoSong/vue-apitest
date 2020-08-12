import request from '../utils/request'

export function variableList (param) {
  return request({
    url: '/variable/',
    method: 'get',
    params: param
  })
}

export function getvariable (id) {
  return request({
    url: '/variable/' + id + '/',
    method: 'get'
  })
}

export function variableAdd (data) {
  return request({
    url: '/variable/',
    method: 'post',
    data
  })
}

export function variableUpdate (id, data) {
  return request({
    url: '/variable/' + id + '/',
    method: 'put',
    data
  })
}

export function variableDelete (id) {
  return request({
    url: '/variable/' + id + '/',
    method: 'delete'
  })
}

export function variableImport (data) {
  return request({
    url: '/variable/import',
    method: 'post',
    data
  })
}
