import React, { Component } from "react";
import ProgressBar from "react-toolbox/lib/progress_bar";
import { observer, inject } from "mobx-react";

import { RadioGroup, RadioButton } from "react-toolbox/lib/radio";
import { Button } from "react-toolbox/lib/button";
import Navigation from "react-toolbox/lib/navigation";

@inject("common")
@observer
export default class Step1 extends Component {
  handleChange = value => {
    this.props.common.temperature = value;
  };
  render() {
    const { common } = this.props;
    return (
      <div>
        <h1>Выбор температуры поверки:</h1>
        <RadioGroup name="temperature" value={common.temperature} onChange={this.handleChange}>
          <RadioButton label="15…30 °С" value="0" />
          <RadioButton label="90…103 °С" value="1" />
        </RadioGroup>
        <br />
        <Navigation>
          <Button
            label="Далее"
            raised
            primary
            disabled={common.temperature == ""}
            onClick={() => this.props.tabChange(1)}
          />
        </Navigation>
      </div>
    );
  }
}
