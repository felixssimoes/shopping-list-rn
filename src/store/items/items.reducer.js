import itemsTypes from './items.types';
import { combineReducers } from 'redux';

const all = (state = [], action) => {
  switch (action.type) {
    case itemsTypes.item.add:
      return [...state, action.payload.id];
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case itemsTypes.item.add:
    case itemsTypes.item.update:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  all,
  byId,
});
