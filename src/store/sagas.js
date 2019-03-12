import {put, takeEvery, call} from 'redux-saga/effects'
import {
  LOGIN_IN
} from './actionTypes'
import {
  login
} from './../api/index'

function * watchLogin(action) {
  console.log(action)

  let result = yield call(login, action.payload)
  console.log(result);
  
}


function* mySaga() {
  yield takeEvery(LOGIN_IN, watchLogin)
}

export default mySaga