import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";

import theme from "./theme";
import store from "./store";

import MainPage from "./pages/main-page";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
            <MainPage />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
