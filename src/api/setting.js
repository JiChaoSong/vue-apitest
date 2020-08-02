import request from '../utils/request'

export function settingList (param) {
  return request({
    url: '/setting/',
    method: 'get',
    params: param
  })
}

export function getsettingInfo () {
  return request({
    url: '/setting/detail',
    method: 'post'
  })
}

export function settingAdd (data) {
  return request({
    url: '/setting/',
    method: 'post',
    data
  })
}

export function settingUpdate (id, data) {
  return request({
    url: '/setting/' + id + '/',
    method: 'put',
    data
  })
}

export function settingDelete (id) {
  return request({
    url: '/setting/' + id + '/',
    method: 'delete'
  })
}
