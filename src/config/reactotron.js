import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';

Reactotron.configure({ name: 'MyShoppingList' });
Reactotron.setAsyncStorageHandler(AsyncStorage);

Reactotron.useReactNative();

Reactotron.use(reactotronRedux());

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

export default Reactotron;
