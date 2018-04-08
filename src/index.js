/* eslint-env browser */
import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import AppContainer from '../common/containers/AppContainer';
import configureStore from './configureStore';

const store = configureStore(window.REDUX_INIT_STATE);

const hotHydrate = () =>
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/:filter?" component={AppContainer} />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );

hotHydrate();

if (module.hot) {
  module.hot.accept('../common/containers/AppContainer', hotHydrate);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(() => console.log('Service Worker Registered'));
}
