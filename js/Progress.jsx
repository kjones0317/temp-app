import React, { Component } from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { observer, inject } from 'mobx-react';

@inject('common')
@observer
export default class Item extends Component {
  render() {
    const { common } = this.props;
    return (
      <div className="progress-basics-example">
        <ProgressBar type="linear" mode="determinate" value={common.progress} />
      </div>
    );
  }
}
