import GlobalStyles from './styles/GlobalStyles';
import AppRouter from './Router';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppRouter />
          <div id="root-modal"> </div>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
