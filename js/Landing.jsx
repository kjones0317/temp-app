/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import DevTools from "mobx-react-devtools";

import { Layout, Panel, Tab, Tabs } from "react-toolbox";

import Progress from "./Progress";
import Step1 from "./Step1";
import Step2 from "./Step2";

@inject("common")
@observer
export default class Landing extends Component {
  constructor(props) {
    super(props);
  }

  handleTabChange = index => {
    this.props.common.step = index;
  };

  render() {
    const { common } = this.props;
    return (
      <div style={{ width: "80%", margin: "auto" }}>
        <Layout>
          <Panel>
            <Tabs index={common.step} onChange={this.handleTabChange}>
              <Tab label="Шаг 1">
                <Step1 tabChange={this.handleTabChange} />
              </Tab>
              <Tab label="Шаг 2" disabled={common.temperature == ""}>
                <Step2 tabChange={this.handleTabChange} />
              </Tab>
              <Tab label="Шаг 3" disabled={common.temperature == ""}><small>Disabled content</small></Tab>
            </Tabs>
            <Progress />
          </Panel>
        </Layout>
      </div>
    );
  }
}
