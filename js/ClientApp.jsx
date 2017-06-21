/* eslint react/prop-types: 0 */
import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import stores from "../stores";
import Landing from "./Landing";

window.stores = stores;

function init() {
  const target = document.getElementById("app");
  render(<Provider {...stores}><Landing /></Provider>, target);
}

init();

if (module.hot) module.hot.accept("./Landing", init);
