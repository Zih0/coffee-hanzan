import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:boerder-box;
    }
    body{
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 14px;
    }

    #root {
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
        'header'
        'main'
        'footer';
    }  
`;
export default GlobalStyles;
