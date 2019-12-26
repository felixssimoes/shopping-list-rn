import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import Reactotron from 'config/reactotron';

import itemsReducer from './items/items.reducer';

const reducers = combineReducers({
  items: itemsReducer,
});

const middlewares = [];

const store = createStore(
  reducers,
  compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()),
);

export default store;
