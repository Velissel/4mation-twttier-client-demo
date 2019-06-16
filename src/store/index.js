import { createStore as create, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

const logger = createLogger({
  collapsed: true,
  logger: console,
  stateTransformer: (state) => {
    return Object.assign({}, state);
  },
  predicate: (getState, { type }) => {
    return !type.startsWith('@@redux-form/');
  },
});

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export function createStore(initialState) {
  return create(reducers, initialState, applyMiddleware(...middlewares));
}