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

  .Content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .tabs {
      display: flex;
    }

    a{
        text-decoration: none;
        color: inherit;
    }

    hr {
      height: 1px;
      border: 0;
      background-color: ${({ theme }) => theme.color.gray02}
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
      line-height: 3rem;
      font-weight: 700;
      text-align: center;
    }

    h2 {
      font-size: 2rem
    }

    body{
        padding-top: 64px;
        font-size: 0.9rem;
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

    textarea {
      background: ${({ theme }) => theme.color.gray01};
      height: 12rem;
      font-size: 0.9375rem;
      padding: 1rem;
      border-radius: 0.5rem;
      border: none;
    }

    textarea::placeholder {
      font-family: 'Noto Sans KR', sans-serif;
    }

    label {
      font-weight: 700;
      display: block;
    }
    
    .select {
    display: flex;    
    }

    select {
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 7.5rem;
  font-size: 15px;
  background-color: ${({ theme }) => theme.color.gray01};
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

    input:disabled {
      background: ${({ theme }) => theme.color.gray02};
      color: ${({ theme }) => theme.color.gray03};
    }

    input[type=radio]{
    display: none;
    }

   input[type=radio]+label:first-of-type {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
   }

   input[type=radio]+label:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
   }

input[type="date"]::before {content:attr(data-placeholder);width:100%}
input[type="date"]:focus::before,
input[type="date"]:valid::before {display:none}

input[type="date"]::placeholder {
      font-family: 'Noto Sans KR', sans-serif;
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


input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]+label {
  display: inline-flex;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  background: white;
  border: 1px solid  ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.green};
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.color.lightgreen};
  }

  &:disabled {
    background: ${({ theme }) => theme.color.gray02};
    color: ${({ theme }) => theme.color.gray03};
    cursor: not-allowed;
  }

}

input[type="checkbox"]:checked + label {
  background: ${({ theme }) => theme.color.green};
  color: white;

  &:active {
    background: ${({ theme }) => theme.color.darkgreen};
  }
}




`;

export default GlobalStyle;
