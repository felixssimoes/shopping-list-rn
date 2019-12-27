import store from 'store';
import * as actions from 'store/actions';

const _globalItems = [];

export const addItem = async ({ name }) => {
  const id = Date.now().toString();
  const existingItem = _findItemWithName(name);
  if (existingItem !== undefined) {
    console.log("There's already an item with that name");
    return false;
  }
  _globalItems.push({
    id,
    name,
    checked: false,
    checkedCount: 0,
    uncheckedAt: Date.now(),
  });
  store.dispatch(actions.updateItemsList([..._globalItems]));
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

  const itemIndex = _itemIndex(item);
  if (itemIndex < 0) {
    console.log('Error finding item');
    return false;
  }
  _globalItems[itemIndex] = item;
  store.dispatch(actions.updateItemsList([..._globalItems]));

  return true;
};

export const checkItem = item => {
  const updatedItem = {
    ...item,
    checked: true,
    checkedCount: item.checkedCount + 1,
  };

  return updateItem(updatedItem);
};

export const uncheckItem = item => {
  const updatedItem = {
    ...item,
    checked: false,
    uncheckedAt: Date.now(),
  };

  return updateItem(updatedItem);
};

const _findItemWithName = name => {
  return _globalItems.find(i => i.name === name);
};

const _itemIndex = item => {
  const index = _globalItems.findIndex(i => i.id === item.id);
  return index;
};
