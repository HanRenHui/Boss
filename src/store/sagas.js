import {put, takeEvery, call} from 'redux-saga/effects'
import {
  LOGIN_IN,
  UPDATE_INFO,
  AUTO_PALY,
  REQ_USER_LIST
} from './actionTypes'

// api
import {
  login,
  updateInfo,
  checkAutoPlay,
  reqUserList
} from './../api/index'


// 登陆
function * watchLogin(action) {
  let result = yield call(login, action.payload)
  const { status, data } = result 
  console.log(data);
  
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

// 自动登陆
function* watchAutoPlay() {
  let result = yield checkAutoPlay() 
  const { status, data } = result 
  console.log(data);
  
  if(status === 200) {
    yield put({
      type: 'autologin',
      Author: data.Author,
      identity: data.identity,
      userInfo: data.userInfo,
      avatar: data.avatar,
      message: data.message
    })
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

function* mySagas() {
  yield takeEvery(LOGIN_IN, watchLogin)
  yield takeEvery(UPDATE_INFO, watchUpdate)
  yield takeEvery(AUTO_PALY, watchAutoPlay)
  yield takeEvery(REQ_USER_LIST, watchReqUserList)
}

export default mySagas