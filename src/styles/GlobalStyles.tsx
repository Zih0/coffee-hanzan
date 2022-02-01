import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

    a {
        text-decoration: none;
        color: inherit;
    }
    * {
        box-sizing: border-box;
    }
    body {
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 14px;


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

    header {
        width: 100vw;
    }

    main {
        margin-top: 5rem;
    }
`;
export default GlobalStyles;
