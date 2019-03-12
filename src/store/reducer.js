let defaultState = {
  errCode: -1,
  message: '',
  Author: ''
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
      return newState
    default : 
      newState.errCode = -1 
      return newState 
  } 
}

export default reducer