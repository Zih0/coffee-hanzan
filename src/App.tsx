import React from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '@contexts/AuthContext';

import AppRouter from './routes/Router';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';

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
