import React from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
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
                    <AppRouter />
                    <Modal />
                    <ToastContainer
                        hideProgressBar
                        autoClose={2000}
                        theme="colored"
                        transition={Flip}
                    />
                </ThemeProvider>
            </AuthProvider>
        </ModalProvider>
    );
}

export default App;
