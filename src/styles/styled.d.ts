import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        color: {
            gray_100: string;
            gray: string;
            white: string;
            black: string;
            black_900: string;
            black_800: string;
            black_700: string;
            violet: string;
            tomato: string;
            yellow: string;
        };
        size: {
            mobile: string;
        };
        animation: {
            fadein: Keyframes;
        };
    }
}
