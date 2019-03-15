import React, { Component } from 'react'
import io from 'socket.io-client'
import './index.css'
import {
  List, 
  InputItem
} from 'antd-mobile'
const socket = io('ws://localhost:1888')

export default class Chat extends Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }
  componentDidMount() {
    socket.on('server message', data => {
      console.log(data);
      
    })
  }
  handleKeyDown = e => {
    if(e.keyCode === 13) {
      socket.emit('client message', {
        text: this.state.text
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
    console.log(this.props.props.match.params.id);
    
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