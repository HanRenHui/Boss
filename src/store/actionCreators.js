import {
  LOGIN_IN,
  UPDATE_INFO,
  AUTO_UPDATE,
  REQ_USER_LIST,
  REQ_BOSS_LIST,
  LOG_OUT
} from './actionTypes'

export const loginAction = paras => ({
  type: LOGIN_IN,
  payload: paras
})

export const updateActopm = paras => ({
  type: UPDATE_INFO,
  payload: paras
})


export const autouUpdataAction = (payload) => ({
  type: AUTO_UPDATE,
  payload
})

export const userlistAction = () => ({
  type: REQ_USER_LIST,
})

export const bosslistAction = () => ({
  type: REQ_BOSS_LIST
})

export const logoutAction = () => ({
  type: LOG_OUT
})