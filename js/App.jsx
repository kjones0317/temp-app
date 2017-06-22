/* eslint react/prop-types: 0 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import Landing from './Landing';

import stores from '../stores';

render(<Provider {...stores}><Landing /></Provider>, document.getElementById('app'));
