import itemsTypes from './items.types';
import { combineReducers } from 'redux';
import { normalizedStateAll, normalizedStateById } from 'utils/redux.utils';

const all = (state = [], action) => {
  switch (action.type) {
    case itemsTypes.list.update:
      return normalizedStateAll(action.payload);

    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case itemsTypes.list.update:
      return normalizedStateById(action.payload);

    default:
      return state;
  }
};

export default combineReducers({
  all,
  byId,
});
