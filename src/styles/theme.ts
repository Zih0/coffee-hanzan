import { DefaultTheme, keyframes } from 'styled-components';

const color = {
    gray_100: '#f1f5f5',
    gray: '#a9a9a9',
    white: '#ffffff',
    black: '#000000',
    black_900: '#111111',
    black_800: '#222222',
    black_700: '#333333',
    violet: '#794bc4',
    tomato: '#ff5f5f',
    yellow: '#fcbf47',
};

const size = {
    mobile: '(max-width: 768px)',
};

const animation = {
    fadein: keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `,
};

export const theme: DefaultTheme = {
    color,
    size,
    animation,
};
