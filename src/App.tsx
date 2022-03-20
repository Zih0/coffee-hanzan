import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import AppRouter from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppRouter />
        <div id="root-modal" />
        <ToastContainer
          hideProgressBar
          autoClose={2000}
          theme="colored"
          transition={Flip}
        />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
