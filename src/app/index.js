import React from 'react';
import { Provider } from 'react-redux';

import BlankScreen from 'ui/screens/blank.screen';
import store from 'store';

const App = () => {
  return (
    <Provider store={store}>
      <BlankScreen message="My Shopping List!" />
    </Provider>
  );
};

export default App;
