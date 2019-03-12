import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'
import {Toast} from 'antd-mobile'
// 拦截请求
axios.interceptors.request.use(config => {
  Toast.loading('loading')
})

// 拦截响应
axios.interceptors.response.use(response => {
  setTimeout(() => {
    Toast.hide()
  }, 300)
})

ReactDOM.render(<App/>, document.querySelector('#root'))