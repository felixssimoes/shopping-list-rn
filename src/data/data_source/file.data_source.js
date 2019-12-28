import AsyncStorage from '@react-native-community/async-storage';

const _itemsKey = 'shoppingList.items';

export const loadItems = async items => {
  const loadedItemsInfo = await AsyncStorage.getItem(_itemsKey);
  return JSON.parse(loadedItemsInfo);
};

export const saveItems = async items => {
  const itemsJson = JSON.stringify(items);
  await AsyncStorage.setItem(_itemsKey, itemsJson);
};
