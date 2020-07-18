import request from '../utils/request'

export function statisticCount (data) {
  return request({
    url: '/statistic/count',
    method: 'post',
    data
  })
}
