import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import Chat from "./pages/Chat";
import Landing from "./pages/Landing";
import Request from "./pages/Request";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpDetail from "./pages/SignUpDetail";
import TradeList from "./pages/TradeList";
import MyPage from "./pages/MyPage";
import Header from "./components/common/Header";
import theme from "./styles/theme";
import Image from "./components/common/Image";
// import Review from "./components/organism/Review";
// import { AuthProvider } from "./AuthContext";
import BusterProfile from "./components/molecule/BusterProfile";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <GlobalStyle />
          <Header />
          {/* 라우팅 */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-up/:usertype" element={<SignUpDetail />} />
            <Route path="/request" element={<Request />} />
            <Route path="/trade-list" element={<TradeList />} />
            <Route path="/buster" element={<BusterProfile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
