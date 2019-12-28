import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import Reactotron from 'config/reactotron';

import itemsReducer from './items/items.reducer';
import itemsMiddleware from './items/items.middleware';

const reducers = combineReducers({
  items: itemsReducer,
});

const middlewares = [...itemsMiddleware];

const store = createStore(
  reducers,
  compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()),
);

export default store;
