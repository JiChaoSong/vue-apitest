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

export function caseCopy (data) {
  return request({
    url: '/case/copy',
    method: 'post',
    data
  })
}

export function simplecaseRun (data) {
  return request({
    url: '/case/run',
    method: 'post',
    data
  })
}

export function caserecordList (param) {
  return request({
    url: '/caserecord/',
    method: 'get',
    params: param
  })
}

export function caserecordInfo (id) {
  return request({
    url: '/caserecord/' + id + '/',
    method: 'get'
  })
}

export function caserecordAdd (data) {
  return request({
    url: '/caserecord/',
    method: 'post',
    data
  })
}

export function caserecordUpdate (id, data) {
  return request({
    url: '/caserecord/' + id + '/',
    method: 'put',
    data
  })
}

export function caserecordDelete (id) {
  return request({
    url: '/caserecord/' + id + '/',
    method: 'delete'
  })
}

export function simplecaserecordRun (data) {
  return request({
    url: '/caserecord/run',
    method: 'post',
    data
  })
}

export function simplecaserecordLast (data) {
  return request({
    url: '/caserecord/last',
    method: 'post',
    data
  })
}
