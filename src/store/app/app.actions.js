import { createAction } from 'utils/redux.utils';
import appTypes from './app.types';

export const appStart = () => createAction(appTypes.start);
