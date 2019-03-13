import {
  LOGIN_IN,
  UPDATE_INFO,
  AUTO_PALY
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