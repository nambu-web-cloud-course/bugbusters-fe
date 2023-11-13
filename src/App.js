import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import Chat from "./pages/Chat";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpDetail from "./pages/SignUpDetail";
import TradeList from "./pages/TradeList";
import MyPage from "./pages/MyPage";
import Header from "./components/common/Header";
import theme from "./styles/theme";
import BusterProfile from "./components/molecule/BusterProfile";
import Request from "./pages/Request"
import RequestDetail from "./pages/RequestDetail";
import ChatList from "./pages/ChatList"
import socket from "./socket";

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
            <Route path="/request/:id" element={<RequestDetail socket={socket} />} />
            <Route path="/trade-list" element={<TradeList />} />
            <Route path="/buster" element={<BusterProfile />} />
            <Route path="/chat" element={<ChatList socket={socket}/>} />
            <Route path="/chat/:room" element={<Chat socket={socket}/>} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
