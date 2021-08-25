import GlobalStyles from './components/GlobalStyles';
import AppRouter from './components/Router';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <AppRouter />
        <div id="root-modal"> </div>
      </AuthProvider>
    </>
  );
}

export default App;
