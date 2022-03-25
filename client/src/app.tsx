import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import theme from './theme';
import store from './store';

import MainPage from './pages/main-page';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainPage />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
