import {put, takeEvery, call} from 'redux-saga/effects'
import {
  LOGIN_IN
} from './actionTypes'
import {
  login
} from './../api/index'

function * watchLogin(action) {
  let result = yield call(login, action.payload)
  const { status, data } = result 
  if(status === 200) {
    yield put({
      type: 'LOGIN',
      err_code: data.err_code, 
      message: data.message,
      user: data.user
    })
  }
  
}


function* mySagas() {
  yield takeEvery(LOGIN_IN, watchLogin)
}

export default mySagas