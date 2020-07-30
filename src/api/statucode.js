import request from '../utils/request'

export function statucodeList (param) {
  return request({
    url: '/statucode/',
    method: 'get',
    params: param
  })
}

export function getstatucode (id) {
  return request({
    url: '/statucode/' + id + '/',
    method: 'get'
  })
}

export function statucodeAdd (data) {
  return request({
    url: '/statucode/',
    method: 'post',
    data
  })
}

export function statucodeUpdate (id, data) {
  return request({
    url: '/statucode/' + id + '/',
    method: 'put',
    data
  })
}

export function statucodeDelete (id) {
  return request({
    url: '/statucode/' + id + '/',
    method: 'delete'
  })
}

export function statucodeImport (data) {
  return request({
    url: '/statucode/import',
    method: 'post',
    data
  })
}
