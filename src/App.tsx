import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Modal from '@components/Modal';

import { AuthProvider } from '@contexts/AuthContext';
import { ModalProvider } from '@contexts/ModalContext';

import AppRouter from './routes/Router';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';

function App() {
    return (
        <ModalProvider>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <BrowserRouter>
                        <AppRouter />
                    </BrowserRouter>
                    <Modal />
                    <Toaster position="top-center" reverseOrder={false} />
                </ThemeProvider>
            </AuthProvider>
        </ModalProvider>
    );
}

export default App;
