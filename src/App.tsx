import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import AppRouter from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppRouter />
        <div id="root-modal"> </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
