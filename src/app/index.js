import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import store from 'store';
import MainStack from 'app/routes/main.route';
import { appStart } from 'store/actions';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

const AppContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(appStart());
  }, [dispatch]);

  return <MainStack />;
};

export default App;
