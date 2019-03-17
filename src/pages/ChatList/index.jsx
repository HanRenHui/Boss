import React, { Component } from 'react'
import './index.css'
import store from './../../store'
export default class ChatList extends Component {
  constructor() {
    super() 
    this.state = {
      unReadMsg: [],
      otherInfo: [],
      userId: ''
    }
  }
  
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        unReadMsg: store.getState().unReadMsg,
        otherInfo: store.getState().otherInfo,
        userId: store.getState().userInfo._id
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  // 将聊天信息分组
  groupArr = () => {
    let groupArr = []
    const { unReadMsg } = this.state.unReadMsg.length > 0 ? 
    this.state : store.getState()
    for(let i=0,length=unReadMsg.length; i<length; i++) {
      let data = unReadMsg[i].chatId
      if(!groupArr.includes(data)) {
        groupArr.push(data)
      }
    }
    return groupArr
  }
  groupObj = groupArr => {
    const groupObj = {}    
    const { unReadMsg } = this.state.unReadMsg.length > 0 ? 
    this.state : store.getState()
    for(let i=0; i<groupArr.length; i++) {
      groupObj[i] = []
    }
    for(let i=0; i<unReadMsg.length; i++) {
      for(let j=0; j<groupArr.length; j++) {
        if(unReadMsg[i].chatId === groupArr[j]) {
          groupObj[j].push(unReadMsg[i])
        }
      }
    }
    
    return groupObj
  }
  findNA = obj => {
    // 装所有的头像
    let avatarArr = []
    // 装所有的用户名
    let nameArr = []
    for(let key in obj) {
      let msgArr = obj[key]

      for(let i=0; i<msgArr.length; i++) {
        // console.log(store.getState().userInfo._id);
        
        if(msgArr[i].to === store.getState().userInfo._id) {
          let from  = msgArr[i].from
          // console.log(msgArr[i].from);
          console.log(from);
          // 根据from找出对方的头像的名字
          store.getState().otherInfo.forEach((info, index) => {
            if(info._id === from) {
              avatarArr.push(info.avatar)
              nameArr.push(info.user)
            } 
          })
          break
        }
      }
    }
    return {
      avatarArr,
      nameArr
    }
  }
  render() {
    // 将所有信息按照用户分组
    let arr = this.groupArr()
    let obj = this.groupObj(arr)
    // 查询用户名和头像
    const { nameArr, avatarArr } = this.findNA(obj)
    // console.log(obj);
    
    return (
      <div className='chatlist'>
        <ul>
          {arr.map((list, index) => (
            <li key={index} className='list-itme'> 
              <img src={avatarArr[index]} alt=""/>
              <div className='list-item-right'>
                <p className='list-item-right-top'>{obj[index][obj[index].length-1].content}</p>
                <p className='list-item-right-bottom'>{nameArr[index]}</p>
              </div>
              <span></span>
            </li>
          ))}
          
        </ul>
      </div>
    )
  }
}