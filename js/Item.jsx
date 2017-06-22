import React, { Component } from 'react';
import { Colors, Button } from 'react-foundation';
import { observer, inject } from 'mobx-react';

@inject('common')
@observer
export default class Item extends Component {
  render() {
    const { common } = this.props;
    return (
      <div className="item">
        <h1>{common.message}</h1>
      </div>
    );
  }
}
