import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../common/reducer';

const loggerMiddleware = createLogger();

const configureStore = preloadedState => {
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, loggerMiddleware)),
  );

  return store;
};

export default configureStore;
