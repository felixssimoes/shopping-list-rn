import { loadCachedItems } from 'data/repository/items.repository';
import appTypes from 'store/app/app.types';

const loadCacheOnAppStart = () => next => action => {
  const result = next(action);
  if (action.type === appTypes.start) {
    loadCachedItems();
  }
  return result;
};

export default [loadCacheOnAppStart];
