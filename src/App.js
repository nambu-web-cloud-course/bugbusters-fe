import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import Chatting from "./pages/Chat";
import Landing from "./pages/Landing";
import Request from "./pages/Request";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpDetail from "./pages/SignUpDetail";
import TradeList from "./pages/TradeList";
import Header from "./components/organism/Header";
import theme from "./styles/theme";
import Image from "./components/atom/Image";
import Review from "./components/organism/Review";
import MyPage from "./pages/MyPage";
import SignInSuccess from "./pages/SignInSuccess";
import RegisterBuster from "./pages/RegisterBuster";

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Request />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/request" element={<Request />} />
            <Route path="/trade-list" element={<TradeList />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-in-success" element={<SignInSuccess />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-up/:usertype" element={<SignUpDetail />} />
            <Route path="/register-buster" element={<RegisterBuster />} />
            <Route path="/chat" element={<Chatting />} />

          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
