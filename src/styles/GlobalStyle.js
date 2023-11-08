import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
   ${reset}

   .App {
  display: flex;
  justify-content: center;
  align-items: center;
  }

  .Content {
    margin-top: 3rem;
  }

    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;        
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
    }
    h2 {
      font-size: 2rem
    }
    p {
      font-size: 1rem
    }
    body{
        padding-top: 64px;
        font-size: 0.9rem;
        font-weight: 400;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #fafafa;
        
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        font-size: 0.9rem;
        background: transparent;
        cursor: pointer;
    }
`;

export default GlobalStyle;
