import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure({ name: 'MyShoppingList' });
// Reactotron.setAsyncStorageHandler(AsyncStorage) // for future usage

Reactotron.useReactNative();

Reactotron.use(reactotronRedux());

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

export default Reactotron;
