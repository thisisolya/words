import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";

import theme from "./theme";
import MainPage from "./pages/main-page";
import { BrowserRouter } from "react-router-dom";
import store from "./store";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainPage />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
