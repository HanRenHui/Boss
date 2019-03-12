let defaultState = {
  // 记录错误码
  errCode: -1,
  // 记录后台传过来的信息
  message: '',
  // 记录用户名
  Author: '',
  // 记录身份 1 大神 2 老板
  identity: 0,

  // 保存大神的各种信息
  userInfo: {
    
  },
  // 保存老板的各种信息
  bossInfo: {

  }
}

// 总结 就算结成了saga， 一开始也是会先走这里的
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
      newState.bossInfo = action.info
      console.log(newState)
      return newState 
    default : 
      newState.errCode = -1 
      return newState 
  } 
}

export default reducer