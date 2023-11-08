import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import Chatting from "./pages/Chat";
import Landing from "./pages/Landing";
import Request from "./pages/Request";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TradeList from "./pages/TradeList";
import Header from "./components/organism/Header";
import theme from "./styles/theme";
import Image from "./components/atom/Image";
import Review from "./pages/Review";
import MyPage from "./pages/MyPage";

// import Button from "./components/atom/Button";
// import Badge from "./components/atom/Badge";
// import Container from "./components/atom/Container";
// import Input from "./components/atom/Input";

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
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/chat" element={<Chatting />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
