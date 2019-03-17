import {put, takeEvery, call} from 'redux-saga/effects'
import {
  LOGIN_IN,
  UPDATE_INFO,
  REQ_USER_LIST,
  REQ_BOSS_LIST,
  GET_CHAT_LIST,
  OFF_LINE_MSG,
  READ_MSG
} from './actionTypes'

// api
import {
  login,
  updateInfo,
  reqUserList,
  reqUnreadMsg,
  reqChatList,
  reqReadMsg
} from './../api/index'



// 登陆
function * watchLogin(action) {
  let result = yield call(login, action.payload)
  const { status, data } = result 
  if(status === 200) {
    yield put({
      type: 'LOGIN',
      err_code: data.err_code, 
      message: data.message,
      user: data.username,
      identity: data.identity,
      info: data.info
    })
  }
  
}

// 更新详细信息
function* watchUpdate(action) {
  let result = yield updateInfo(action.payload)
  const { status, data } = result 
  if(status === 200) {
    if(data.err_code === 0) {
      yield put({
        type: 'UPDATE',
        info: data.info
      })
    }
  }
}

// 请求大神列表
function* watchReqUserList() {
  let result = yield reqUserList({
    type: 'user'
  })
  const { data, status } = result   
  if(status === 200) {
    yield put({
      userList: data.userList,
      type: 'USER_LIST'
    })
  }
}
function* watchReqBossList() {
  let result = yield reqUserList({
    type: 'boss'
  })
  const { data, status } = result   
  if(status === 200) {
    yield put({
      bossList: data.bossList,
      type: 'BOSS_LIST'
    })
  }
}

function* watchGetChatList(payload) {
  const {from, to} = payload.payload
  let result = yield reqChatList({
    from,
    to
  })
  const { data,status } = result 
  if(status === 200) {
    yield put({
      type: 'GetChatList',
      data: data.data
    })
  }
}

function* watchGetOfflineMsg() {
  let result = yield reqUnreadMsg()
  const { data, status } = result 
  
  if(status === 200) {
    yield put({
      type: 'OFF_LINE_MSG',
      unreadMsg: [...data.from_msg, ...data.to_msg],
      otherInfo: data.otherInfo
    })
  }

}
function* watchReadMsg(action) {
  // console.log(action);
  let to = action.payload.to
  yield reqReadMsg({to})
}

function* mySagas() {
  yield takeEvery(LOGIN_IN, watchLogin)
  yield takeEvery(UPDATE_INFO, watchUpdate)
  yield takeEvery(REQ_USER_LIST, watchReqUserList)
  yield takeEvery(REQ_BOSS_LIST,watchReqBossList)
  yield takeEvery(GET_CHAT_LIST, watchGetChatList)
  yield takeEvery(OFF_LINE_MSG, watchGetOfflineMsg)
  yield takeEvery(READ_MSG, watchReadMsg)

}

export default mySagas