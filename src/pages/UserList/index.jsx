import React, { Component } from 'react'
import store from './../../store'
import './index.css'
import User from './../../components/User'
import {
  userlistAction,
} from './../../store/actionCreators'
export default class UserList extends Component {
  constructor() {
    super()
    this.state = {
      userList: [],
    }
  }
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      
      this.setState({
        userList: store.getState().userList,
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
    return (
      <div className='userlist'>
          {this.state.userList.map((list, index) => (
          <User list={list} index={index} key={index} history={this.props.props.history}/>
          ))}
      </div>
    )
  }
}