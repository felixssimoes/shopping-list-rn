import store from 'store';
import * as actions from 'store/actions';
import { getAllItems } from 'store/selectors';

export const addItem = async ({ name }) => {
  const id = Date.now().toString();
  const existingItem = _findItemWithName(name);
  if (existingItem !== undefined) {
    console.log("There's already an item with that name");
    return false;
  }
  store.dispatch(actions.addItem({ id, name, checked: false }));
  return true;
};

export const updateItem = async item => {
  if (!item || !item.id) {
    return;
  }

  const existingItem = _findItemWithName(item.name);
  if (existingItem !== undefined && existingItem.id !== item.id) {
    console.log("There's already an item with that name");
    return false;
  }

  store.dispatch(actions.updateItem(item));

  return true;
};

const _findItemWithName = name => {
  return getAllItems(store.getState()).find(i => i.name === name);
};
