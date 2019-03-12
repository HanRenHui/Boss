import ajax from './ajax'

const BASE_URL = 'http://localhost:1888'

export const login = params => ajax(BASE_URL + '/login', params, 'POST')