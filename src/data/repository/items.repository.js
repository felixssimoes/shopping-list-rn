import store from 'store';
import { addItem as addReduxItem } from 'store/actions';

export const addItem = async ({ name }) => {
  const id = Date.now().toString();
  store.dispatch(addReduxItem({ id, name }));
};
