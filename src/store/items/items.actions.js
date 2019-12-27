import { createAction } from 'utils/redux.utils';
import itemsTypes from './items.types';

export const updateItemsList = items =>
  createAction(itemsTypes.list.update, items);
