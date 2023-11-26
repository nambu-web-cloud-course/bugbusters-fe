import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpDetail from "./pages/SignUpDetail";
import TradeList from "./pages/TradeList";
import MyPage from "./pages/MyPage";
import Header from "./components/common/Header";
import theme from "./styles/theme";
import BusterProfile from "./components/form/BusterProfile";
import Request from "./pages/Request";
import RequestDetail from "./pages/RequestDetail";
import socket from "./socket";
import Chat from "./components/chat/Chat";
import ChatList from "./pages/ChatList";
import Review from "./pages/Review"
import NotFound from "./pages/NotFound"


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <GlobalStyle />
          <Header socket={socket}/>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-up/:usertype" element={<SignUpDetail />} />
            <Route path="/request" element={<Request />} />
            <Route
              path="/request/:id"
              element={<RequestDetail socket={socket} />}
            />
            <Route path="/chat" element={<ChatList socket={socket} />} />
            <Route path="/chat/:chatroom" element={<Chat socket={socket} />} />
            <Route path="/trade-list" element={<TradeList />} />
            <Route path="/buster" element={<BusterProfile />} />
            <Route path="/profile" element={<BusterProfile />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/review/:tradeid/:busterid" element={<Review />} />            
            <Route path="*" element={<NotFound />} />
          </Routes>        
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
