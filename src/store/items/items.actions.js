import { createAction } from 'utils/redux.utils';
import itemsTypes from './items.types';

export const addItem = item => createAction(itemsTypes.item.add, item);
