import request from '../utils/request'

export function moduleList (param) {
  return request({
    url: '/module/',
    method: 'get',
    params: param
  })
}

export function moduleAdd (data) {
  return request({
    url: '/module/',
    method: 'post',
    data
  })
}

export function moduleUpdate (id, data) {
  return request({
    url: '/module/' + id + '/',
    method: 'put',
    data
  })
}

export function moduleDelete (id) {
  return request({
    url: '/module/' + id + '/',
    method: 'delete'
  })
}
