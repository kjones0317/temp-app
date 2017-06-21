/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Colors, Button } from "react-foundation";
import { inject, observer } from "mobx-react";

const tools = require("mobx-react-devtools");

@inject("common")
@observer
export default class Landing extends Component {
  clickHandle = () => {
    console.log(this.props.common);
    this.props.common.addtestMessage("test2");
  };
  render() {
    const { common } = this.props;
    const dev = process.env.NODE_ENV !== "production";
    if (dev) this.tools = tools.default;
    return (
      <div className="landing">
        <h1>svideo</h1>
        <input type="text" placeholder="Search" />
        <Button color={Colors.SUCCESS} onClick={e => this.clickHandle(e)}>Save</Button>
        <Button color={Colors.ALERT}>1</Button>
        <LandingOne />
      </div>
    );
  }
}
@inject("common")
@observer
class LandingOne extends Component {
  render() {
    const { common } = this.props;
    return (
      <div>
        {common.message}2
      </div>
    );
  }
}
