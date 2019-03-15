import {
  AUTO_UPDATE,
  LOG_OUT
} from './actionTypes'
let defaultState = {
  // 记录错误码
  errCode: -1,
  // 记录后台传过来的信息
  message: '',
  // 记录用户名
  Author: '',
  // 记录身份 1 大神 2 老板
  identity: 0,
  avatar: '',
  // 保存各种信息
  userInfo: {
  },
  userList: [],
  bossList: []

}


// 总结 就算集成了saga， 一开始也是会先走这里的
function reducer(state = defaultState, action) {
  if(!action) return 
  let newState = JSON.parse(JSON.stringify(state))
  switch(action.type) {
    case 'LOGIN': 
      newState.errCode = action.err_code
      newState.message = action.message 
      newState.Author = action.user 
      newState.identity = action.identity
      newState.userInfo = action.info
      return newState
    case 'UPDATE': 
      newState.userInfo = action.info
      newState.message=action.message
      return newState 
    case AUTO_UPDATE: 
      const { payload } = action
      newState.Author= payload.Author 
      newState.identity = payload.identity 
      newState.userInfo = payload.userInfo
      return newState
    case 'USER_LIST': 
      newState.userList = action.userList
      return newState
    case 'BOSS_LIST': 
      newState.bossList = action.bossList 
      return newState
    case LOG_OUT:
      newState.Author = ''
      newState.avatar = ''
      newState.identity = ''
      newState.userInfo = {}
      return newState
    default : 
      newState.errCode = -1 
      return newState 
  } 
}

export default reducer