import {
  LOGIN_IN,
  UPDATE_INFO,
  AUTO_UPDATE,
  REQ_USER_LIST,
  REQ_BOSS_LIST,
  LOG_OUT,
  ADD_CHAT_TEXT,
  GET_CHAT_LIST,
  ADD_UN_READ,
  OFF_LINE_MSG
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

export const chatTextAction = data => ({
  type: ADD_CHAT_TEXT,
  payload: data
})

export const chatlistAction = (payload) => ({
  type: GET_CHAT_LIST,
  payload
})


export const unreadAction = data => ({
  type: ADD_UN_READ,
  data
})

export const offLineMesAction = () => ({
  type: OFF_LINE_MSG,
})