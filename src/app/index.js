import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import store from 'store';
import MainStack from 'app/routes/main.route';
import { loadCachedItems } from 'data/repository/items.repository';

const App = () => {
  useEffect(() => {
    loadCachedItems();
  }, []);

  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
};

export default App;
