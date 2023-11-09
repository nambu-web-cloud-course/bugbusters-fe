import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
   ${reset}

   .App {
  display: flex;
  justify-content: center;
  align-items: center;
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
    input {
    width: 100%;
    padding: 1rem;
    height: 3rem;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.25rem;
    letter-spacing: -0.01563rem;
    border: none;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.color.gray01};
    }

    label {
      font-weight: 700;
      display: block;
      margin-bottom: 0.8rem;
    }

[type="radio"] {
  vertical-align: middle;
  appearance: none;
  border: max(5px, 0.1em) solid  ${({ theme }) => theme.color.gray02} ;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
}

[type="radio"]:checked {
  border: 5px solid ${({ theme }) => theme.color.green};
}

[type="radio"]:hover {
  cursor: pointer;
}

[type="radio"]:disabled {
  background-color: lightgray;
  box-shadow: none;
  opacity: 0.7;
  cursor: not-allowed;
}
`;

export default GlobalStyle;
