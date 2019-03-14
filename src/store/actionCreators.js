import {
  LOGIN_IN,
  UPDATE_INFO,
  AUTO_PALY,
  REQ_USER_LIST
} from './actionTypes'

export const loginAction = paras => ({
  type: LOGIN_IN,
  payload: paras
})

export const updateActopm = paras => ({
  type: UPDATE_INFO,
  payload: paras
})


export const autoplayAction = () => ({
  type: AUTO_PALY
})

export const userlistAction = () => ({
  type: REQ_USER_LIST
})