import request from '../utils/request'

export function projectList (param) {
  return request({
    url: '/project/',
    method: 'get',
    params: param
  })
}

export function projectAdd (data) {
  return request({
    url: '/project/',
    method: 'post',
    data
  })
}

export function projectUpdate (id, data) {
  return request({
    url: '/project/' + id + '/',
    method: 'put',
    data
  })
}

export function projectDelete (id) {
  return request({
    url: '/project/' + id + '/',
    method: 'delete'
  })
}
