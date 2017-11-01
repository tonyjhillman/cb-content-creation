import React from 'react';
import Diff from 'react-diff';

/*
 The RenderPane method returns the button for displaying the Node.js
 filtered version of the source-file.
 */
export default class RenderPane extends React.Component {
  
  render() {
    return (
      <div
        className='renderPane'
        id='renderPane'
        style={{
          border: '2px solid black',
          backgroundColor: 'white',
          boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
        }}
      >
        <Diff inputA={this.props.inputA} inputB={this.props.inputB} type="words"/>
        <div style={{
          zIndex: 99,
          paddingLeft: 20,
          position: 'relative',
          top: 10,
          left: 10
        }}>
				<span>

					<img src={require('./../images/couchbaseLogoTrans.png')}
               alt={require('./../images/couchbaseLogoTransAlt.png')}
               style={{
                 zIndex: 10,
                 position: 'absolute',
                 width: 240,
                 height: 240,
                 top: 530,
                 left: 210
               }}
          />
				</span>

          <div dangerouslySetInnerHTML={{__html: this.props.htmlPaneContent}}/>

        </div>
      </div>
    )
  }
}