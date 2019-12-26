import React from 'react';
import { Provider } from 'react-redux';

import store from 'store';
import MainStack from 'app/routes/main.route';

const App = () => {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
};

export default App;
