import ajax from './ajax'

const BASE_URL = 'http://localhost:1888'

export const login = params => ajax(BASE_URL + '/login', params, 'POST')

export const updateInfo = params => ajax(BASE_URL + '/api/updata', params, 'POST')

export const checkAutoPlay = () => ajax(BASE_URL + '/api/autoplay')

export const reqUserList = params => ajax(BASE_URL + '/api/user/list', params)