/* eslint react/prop-types: 0 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Landing from './Landing';

import Common from '../stores/common';

const commonStore = new Common();

render(
  <AppContainer>
    <Landing common={commonStore} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./Landing', () => {
    render(
      <AppContainer>
        <Landing common={commonStore} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
