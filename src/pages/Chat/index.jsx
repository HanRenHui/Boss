import React, { Component } from 'react'

export default class Chat extends Component {
  render() {
    // let id = this.props.match.params.id
    console.log(this.props.props.match.params.id);
    
    return (
      <div>chat page Id</div>
    )
  }
}