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
import MyPage from "./pages/MyPage";
import Header from "./components/organism/Header";
import theme from "./styles/theme";
import Image from "./components/atom/Image";
import Review from "./components/organism/Review";
import RegisterBuster from "./pages/RegisterBuster";
import Users from "./Users";
import { UsersProvider } from "./UsersContext";
const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <GlobalStyle />
          <Header />
          <UsersProvider>
            <Users />
          </UsersProvider>
          {/* 라우팅 */}
          <Routes>
            <Route path="/" element={<Request />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/request" element={<Request />} />
            <Route path="/trade-list" element={<TradeList />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-up/:usertype" element={<SignUpDetail />} />
            <Route path="/buster" element={<RegisterBuster />} />
            <Route path="/chat" element={<Chatting />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
