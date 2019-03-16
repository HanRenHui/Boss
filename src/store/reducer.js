import {
  AUTO_UPDATE,
  LOG_OUT,
  ADD_CHAT_TEXT,
  ADD_UN_READ
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
  // 聊天页的 防止多次舰艇
  isSocket: 0,
  // 一级路由页的 防止多次监听
  isSocket2: 0,
  userList: [],
  // bossList: [],
  // 消息列表
  chatList: [],
  // 记录未读信息各种信息
  unReadMsg: []

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
      newState.userList = action.bossList 
      return newState
    case LOG_OUT:
      newState.Author = ''
      newState.avatar = ''
      newState.identity = ''
      newState.userInfo = {}
      return newState
    case ADD_CHAT_TEXT:
      newState.chatList.push(action.payload)
      return newState 
    case 'GetChatList': 
      newState.chatList = action.data
      return newState 
    case 'INIT_SOCKET': 
      newState.isSocket = 1
      return newState 
    case 'initsocket': 
      console.log(1);
      
      newState.isSocket2 = 1
      return newState
    case ADD_UN_READ: 
      newState.unReadMsg.push(action.data)
      return newState
    case 'OFF_LINE_MSG': 
      // action unReadMsg 里有你所有想要的
      newState.unReadMsg = action.unreadMsg
      return newState 
    default : 
      newState.errCode = -1 
      return newState 
  } 
}

export default reducer