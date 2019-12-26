import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import Reactotron from 'config/reactotron';

const reducers = combineReducers({
  lists: (state = null) => state,
});

const middlewares = [];

const store = createStore(
  reducers,
  compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()),
);

export default store;
