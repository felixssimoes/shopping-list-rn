import { createAction } from 'utils/redux.utils';
import itemsTypes from './items.types';

export const addItem = item => createAction(itemsTypes.item.add, item);

export const updateItem = item => createAction(itemsTypes.item.update, item);
