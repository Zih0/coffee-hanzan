import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    
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
        
      }
    
    input, textarea {
      &:focus {
        outline: 1px solid ${({ theme }) => theme.color.black};
      }
    }
    
`;
export default GlobalStyles;
