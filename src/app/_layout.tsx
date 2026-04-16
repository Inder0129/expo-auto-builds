import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { ThemeProvider } from './theme';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
};
export default App;
