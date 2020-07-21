import request from '../utils/request'

export function caseList (param) {
  return request({
    url: '/case/',
    method: 'get',
    params: param
  })
}

export function caseInfo (id) {
  return request({
    url: '/case/' + id + '/',
    method: 'get'
  })
}

export function caseAdd (data) {
  return request({
    url: '/case/',
    method: 'post',
    data
  })
}

export function caseUpdate (id, data) {
  return request({
    url: '/case/' + id + '/',
    method: 'put',
    data
  })
}

export function caseDelete (id) {
  return request({
    url: '/case/' + id + '/',
    method: 'delete'
  })
}

export function simplecaseRun (data) {
  return request({
    url: '/case/run',
    method: 'post',
    data
  })
}
