import { Component } from 'react'
import {
  autoplayAction
} from './../../store/actionCreators.js'
import store from './../../store'
import { withRouter } from 'react-router-dom'
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
    this.unsubscribe = store.subscribe(() => {
      let isInit  = store.getState().userInfo ? 
                    store.getState().userInfo : 0
      this.setState({
        isInit: isInit,
        Author: store.getState().Author,
        identity: store.getState().identity,
        message: store.getState().message
      }, () => {
        console.log(0);
        
        // if(this.state.Author) {
        //   // 自动登陆
        //   let path = this.state.identity === 1 ? '/user' : '/boss'
        //   this.props.history.push(path)
          
        //   Toast.success(this.state.message, 2)
        // }else {
        //   // 未登录跳转到登陆页
        //   this.props.history.push('/')
        //   Toast.fail('请先登录', 1)
        // }
      })
    })
  }
  componentDidMount() {
    //自动登陆
    // store.dispatch(autoplayAction())
  }
  componentWillUnmount() {
    // this.unsubscribe()
  }
  render() {
    return null
  }
}

export default withRouter(AutoRoute)
