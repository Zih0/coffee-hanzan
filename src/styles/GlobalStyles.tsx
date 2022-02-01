import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    @import url('http://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css');

    a {
        text-decoration: none;
        color: inherit;
    }
    * {
        box-sizing: border-box;
        font-family: 'SUIT', sans-serif;
    }
    body {
        font-size: 14px;
        font-family: 'SUIT', sans-serif;
        @media ${({ theme }) => theme.size.mobile} {
            font-size: 12px;
        }
    }

    input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        
        &:focus {
          outline: none;
        }
      }

    
`;
export default GlobalStyles;
