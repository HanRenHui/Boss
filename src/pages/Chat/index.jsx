import React, { Component } from 'react'
import io from 'socket.io-client'
import './index.css'
import {
  List, 
  InputItem
} from 'antd-mobile'
import {
  chatTextAction,
  chatlistAction
} from './../../store/actionCreators'
import store from './../../store'
const socket = io('ws://localhost:1888')


export default class Chat extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      isSocket: 0
    }
  }
  componentWillMount() {
    
  }
  componentDidMount() {
    if(!store.getState().isSocket) {
    store.dispatch({type: 'INIT_SOCKET'})
      socket.on('server message', data => {
        let user_id = store.getState().userInfo._id
        // 筛选服务端传来的信息，看是不是属于这两个用户的
        if(data.from === user_id || data.to === user_id ) {
          往聊天列表里添加
          console.log('添加了添加了');
          
          store.dispatch(chatTextAction(data))
        }
      })
    }
  

    // 获取聊天列表
    store.dispatch(chatlistAction({
      from: store.getState().userInfo._id,
      to: this.props.props.match.params.id
    }))
  }
  handleKeyDown = e => {
    if(e.keyCode === 13 && this.state.text.length > 0) {
      socket.emit('client message', {
        from: store.getState().userInfo._id,
        to: this.props.props.match.params.id,
        content: this.state.text
      })
      this.setState({
        text: ''
      })
    }
  }
  handleChange = val => {
    this.setState({
      text: val
    })
  }
  render() {
    // let id = this.props.match.params.id
    return (
      <div className='chat'>
        <List className='buttom-input'>
          <InputItem
            onKeyDown={e => this.handleKeyDown(e)}
            value={this.state.text}
            onChange={val => this.handleChange(val)}
            placeholder="回车键即发送"
            extra="发送"
          ></InputItem>
        </List>
      </div>
    )
  }
}