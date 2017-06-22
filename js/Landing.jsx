/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { Colors, Button } from 'react-foundation';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@observer
export default class Landing extends Component {
  clickHandle = () => {
    this.props.common.addtestMessage('test2');
  };
  render() {
    const { common } = this.props;
    return (
      <div className="landing">
        <h1>svideo</h1>
        <input type="text" placeholder="Search" />
        <Button color={Colors.SUCCESS} onClick={e => this.clickHandle(e)}>Save</Button>
        <Button color={Colors.ALERT}>1</Button>
        <div>{common.message}</div>
        <DevTools />
      </div>
    );
  }
}
