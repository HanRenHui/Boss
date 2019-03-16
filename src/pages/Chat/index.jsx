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
import { NavBar, Icon, Grid } from 'antd-mobile'

const socket = io('ws://localhost:1888')

export default class Chat extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      show: false,
      isSocket: 0,
      chatList: [],
      userInfo: {},
      userList: []
    }
  }
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        chatList: store.getState().chatList,
        userInfo: store.getState().userInfo,
        userList: store.getStaee
      })
    })
  }
  componentDidMount() {
    // 每次进入这个页面都会监听一次，所以会造成浏览器端监听多次的情况，在store中
    // 放一个变量来控制该页面只监听一次
    if(!store.getState().isSocket) {
    store.dispatch({type: 'INIT_SOCKET'})
      socket.on('server message', data => {
        let user_id = store.getState().userInfo._id
        // 筛选服务端传来的信息，看是不是属于这两个用户的
        if(data.from === user_id || data.to === user_id ) {
          // 往聊天列表里添加
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
  componentWillUnmount() {
    this.unsubscribe()
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
  back = () => {
    this.props.props.history.goBack()
    // console.log(this.props.props.history);
    
  }
  showEmoj = () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
    this.setState({
      show: !this.state.show
    })
  }
  render() {
    // let id = this.props.match.params.id
    let classname
    // 找出other的头像
    let userIndex = store.getState().userList.findIndex(list => {
      return list._id === this.props.props.match.params.id
    })
    let chatName = store.getState().userList[userIndex] ? store.getState().userList[userIndex].user: ''
    let avatar = ''
    const data = [
      '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊',
      '😋', '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩', 
      '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮',
      '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤',
      '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞',
      '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬',
      '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒',
      '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🤥', '🤫', '🤭',
      '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖',
      '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'
    ].map(v => ({text: v}))
    return (

      <div className='chat'>
        <NavBar
          mode="dark"
          style={{position: 'fixed', left: 0, top: 0, width: '100%'}}
          leftContent={
            <Icon type='left' onClick={() => this.back()}></Icon>
          }
        >{chatName}</NavBar>
        <ul>
          {this.state.chatList.map((list, index) => {
            store.getState().userInfo._id === list.from ? classname = 'text my' : classname = 'text other'
            store.getState().userInfo._id === list.from ? 
            avatar = store.getState().userInfo.avatar :
            avatar = store.getState().userList[userIndex].avatar

            return(
              <li key={index} className={classname}>
                <span className='textbox'>
                  <img src={avatar} alt=""/>
                  <span className='text-content'>{list.content}</span>
                </span>
                
              </li>
            ) 
          })}
        </ul>
        <List className='buttom-input'>
          <InputItem
            onKeyDown={e => this.handleKeyDown(e)}
            value={this.state.text}
            onChange={val => this.handleChange(val)}
            placeholder="回车键即发送"
            extra={
              <div>
                <span style={{fontSize: 18, marginRight: 10}} onClick={this.showEmoj}>😋</span>
                <span>发送</span>
              </div>
            }
          ></InputItem>
          {this.state.show ? 
            <Grid 
              data={data} 
              isCarousel 
              onClick={_el => {
                this.setState({
                  text: this.state.text + _el.text
                })
              }} 
              columnNum={9}
              carouselMaxRow={4}
            /> :
            null
          }
        

        </List>
      </div>
    )
  }
}