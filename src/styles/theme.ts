import { DefaultTheme, keyframes } from 'styled-components';

const color = {
    gray: '#a9a9a9',
    white: '#ffffff',
    black: '#000000',
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
