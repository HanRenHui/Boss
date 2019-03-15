import { Component } from 'react'
import {
  autouUpdataAction
} from './../../store/actionCreators.js'
import store from './../../store'
import { withRouter } from 'react-router-dom'
import { 
  checkAutoPlay
} from './../../api/index'
import {
  Toast
} from 'antd-mobile'

class AutoRoute extends Component {
  constructor() {
    super() 
    this.state = {
      isInit: 0
    }
  }
  componentWillMount() {
    checkAutoPlay().then(data => {
      const result = data.data
      if(result.err_code === 0) {
        Toast.success(result.message)
        let path = result.identity === 1 ? '/user' : '/boss'
        // 检测是否已经完善信息, 未完善需要跳转到完善信息页面
        if(!result.userInfo.isInit) {
          this.props.history.push(`${path}info`)
        }else {
          this.props.history.push(`${path}/list`)
        }
        store.dispatch(autouUpdataAction({
          Author: result.Author,
          identity: result.identity,
          userInfo: result.userInfo
        }))
      }else if(result.err_code === 4){
        Toast.fail('请先登录')
        this.props.history.push('/')
      }else {
        Toast.fail('服务器错误，请稍后重试')
        this.props.history.push('/')
      }
    })
  }
 
  render() {
    return null
  }
}

export default withRouter(AutoRoute)
