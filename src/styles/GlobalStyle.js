import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
   ${reset}

   .App {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
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


    body{
        padding-top: 64px;
        font-size: 0.9rem;
        font-weight: 400;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #fafafa;   
    }

    ol, ul{
        list-style: none;
        cursor: pointer;
    }
    li {
      list-style-type: none;
      cursor: pointer;
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
    textarea {
      background: ${({ theme }) => theme.color.gray01};
      height: 12.5rem;
      font-size: 0.9375rem;
      padding: 1rem;
      border-radius: 0.5rem;
      border: none;
    }
    label {
      font-weight: 700;
      display: block;
    }
    
    .select {
    display: flex;    
    }

    .tabs {
      display: flex;
      margin-top: 2rem;
    }
    input[type=radio]{
    display: none;
    }

  /* first-child가 안 되는 이유..? */
  /* styled로 빼는 게 나을지 고민 */
  input[type=radio]+label:first-of-type {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  input[type=radio]+label:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
    .tabs input[type=radio]+label{
    display: inline-block;
    cursor: pointer;
    width: 100%;
    border-bottom: 2px solid ${({ theme }) => theme.color.gray02};
    border-radius: 0;
    padding: 1rem;
    text-align: center;
    font-weight: 400;
    font-size: 0.9375rem;
  }

  .tabs input[type=radio]:checked+label{
    border-radius: 0;
    border-bottom: 2px solid ${({ theme }) => theme.color.green};
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .select input[type=radio]+label{
    display: inline-block;
    cursor: pointer;
    width: 100%;
    margin-left: -1px;
    background-color: white;
    color: ${({ theme }) => theme.color.green};
    border: 1px solid ${({ theme }) => theme.color.green};
    padding: 1rem;
    text-align: center;
    font-weight:bold;
    font-size: 0.9375rem;
  }
  .select input[type=radio]:checked+label{
    background-color: ${({ theme }) => theme.color.green};
    color:white;
  }



`;

export default GlobalStyle;
