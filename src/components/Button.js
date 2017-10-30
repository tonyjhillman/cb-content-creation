import React from 'react';

export default class Button extends React.Component {
  render() {
    return (
      <button
        onClick = {this.props.onClick}
        id='javaButton'
        style={{
          border: '2px solid black',
          width: 110,
          height: 40,
          backgroundColor: 'white',
          boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
        }}
      >
        {this.props.title}
      </button>
    )
  }
}