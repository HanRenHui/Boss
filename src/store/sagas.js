import {put, takeEvery, call} from 'redux-saga/effects'
import {
  LOGIN_IN,
  UPDATE_INFO
} from './actionTypes'
// api
import {
  login,
  updateInfo
} from './../api/index'

function * watchLogin(action) {
  let result = yield call(login, action.payload)
  const { status, data } = result 
  if(status === 200) {
    yield put({
      type: 'LOGIN',
      err_code: data.err_code, 
      message: data.message,
      user: data.username,
      identity: action.payload.identity,
      info: data.info
    })
  }
  
}


function* watchUpdate(action) {
  let result = yield updateInfo(action.payload)
  const { status, data } = result 
  console.log(data)
  if(status === 200) {
    if(data.err_code === 0) {
      put({
        type: 'UPDATE',
        info: data.info
      })
    }
  }
}

function* mySagas() {
  yield takeEvery(LOGIN_IN, watchLogin)
  yield takeEvery(UPDATE_INFO, watchUpdate)
}

export default mySagas