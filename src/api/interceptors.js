import axios from 'axios'
import {Toast} from 'antd-mobile'
// 拦截请求
axios.interceptors.request.use(config => {
  Toast.loading('loading')
})

// 拦截响应
axios.interceptors.response.use(response => {
  Toast.hide()
})