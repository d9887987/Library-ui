import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/library/login/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/library/login/login',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/library/login/logout',
    method: 'post'
  })
}

