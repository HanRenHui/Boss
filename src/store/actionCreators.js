import {
  LOGIN_IN,
  UPDATE_INFO
} from './actionTypes'

export const loginAction = paras => ({
  type: LOGIN_IN,
  payload: paras
})

export const updateActopm = paras => ({
  type: UPDATE_INFO,
  payload: paras
})
