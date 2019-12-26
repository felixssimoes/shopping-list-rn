import itemsTypes from './items.types';

const items = (state = [], action) => {
  switch (action.type) {
    case itemsTypes.item.add:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default items;
