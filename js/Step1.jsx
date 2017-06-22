import React, { Component } from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { observer, inject } from 'mobx-react';

import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import { Button } from 'react-toolbox/lib/button';
import Navigation from 'react-toolbox/lib/navigation';

@inject('common')
@observer
export default class Step1 extends Component {
  handleChange = value => {
    this.props.common.temperature = value;
  };
  render() {
    const { common } = this.props;
    return (
      <div>
        <p>Выберите один вариант:</p>
        <RadioGroup name="temperature" value={common.temperature} onChange={this.handleChange}>
          <RadioButton label="0" value="0" />
          <RadioButton label="100" value="100" />
        </RadioGroup>
        <br />
        <Navigation>
          <Button
            label="Далее"
            raised
            primary
            disabled={common.temperature == ''}
            onClick={() => this.props.tabChange(1)}
          />
        </Navigation>
      </div>
    );
  }
}
