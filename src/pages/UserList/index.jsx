import React, { Component } from 'react'
import store from './../../store'
import './index.css'
import {
  userlistAction
} from './../../store/actionCreators'
import { Card } from 'antd-mobile'
export default class UserList extends Component {
  constructor() {
    super()
    this.state = {
      userList: []
    }
  }
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      
      this.setState({
        userList: store.getState().userList
      })
    })
  }
  componentDidMount() {
    store.dispatch(userlistAction())
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    console.log(store.getState().userList);
    
    return (
      <div className='userlist'>
          {this.state.userList.map((list, index) => (
            <div key={index} className='mycard'>
              <div className="card-header">
                <div className="card-header-left">
                  <img src={list.avatar} alt=""/>
                  <span>{list.title}</span>
                </div>
                <div className="card-header-right">{list.money}</div>
              </div>
              <div className="card-body">
               {list.desc.split('\n').map((d, key) => (
                 <div key={key}>{d}</div>
               ))}
              </div>
             {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
           </div>
          ))}
      </div>
    )
  }
}