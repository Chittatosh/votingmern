import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import AppContainer from '../common/containers/AppContainer';
import configureStore from './configureStore';

const store = configureStore(window.__PRELOADED_STATE__);

const render = container => {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/:filter?" component={container} />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
};

render(AppContainer);

if (module.hot) {
  module.hot.accept('../common/containers/AppContainer', () => {
    const NextRootContainer = require('../common/containers/AppContainer').default;  
    render(NextRootContainer);
  });
}
