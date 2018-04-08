import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';

import Poll from './schema';
import { catchFn } from './api';
import getHtmlString from './getHtmlString';
import reducer from '../common/reducer';
import AppContainer from '../common/containers/AppContainer';

const serverRender = (req, res) => {
  Poll.find({}, null, { sort: { voteSum: -1 } })
    .then(pollArr => {
      const normPollObj = pollArr.reduce((obj, item) => {
        obj[item._id] = item;
        return obj;
      }, {});
      const preloadedState = {
        poll_idArr: pollArr.map(item => `${item._id}`),
        normPollObj,
        fbggId: (req.user && req.user.fbggId) || '',
        displayName: (req.user && req.user.displayName) || '',
        isFetching: '',
        fetchError: '',
        searchTerm: '',
      };
      const store = createStore(reducer, preloadedState);
      const serializedState = JSON.stringify(store.getState()).replace(
        /</g,
        '\\x3c',
      );
      const context = {};
      const serializedComponent = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Route path="/:filter?" component={AppContainer} />
          </StaticRouter>
        </Provider>,
      );
      res.send(getHtmlString(serializedComponent, serializedState));
    })
    .catch(error => catchFn(error, res));
};

export default serverRender;
