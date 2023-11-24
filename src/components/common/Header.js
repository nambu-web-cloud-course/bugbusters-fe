import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { DropDown, DropMenu } from "./DropDown";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Span } from "./Text";
import Logo from "./Logo";
import GapItems from "../common/GapItems";
import api from "../../api";

const StyledHeader = styled.header`
  top: 0;
  position: fixed;
  width: 100%;
  height: 3.5rem;
  background-color: ${({ theme, usertype }) =>
    usertype === "B" ? theme.color.lightgreen : "white"};
  display: flex;
  justify-content: center;
  box-shadow: ${({ usertype }) => (usertype === "B" ? "0" : "0 0 6px rgba(0, 0, 0, 0.1)")};
  z-index: 999;
`;

const InnerHeader = styled.div`
  width: 50rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Alarm = styled.span`
  padding: 0.4rem 0.6rem;
  border-radius: 100rem;
  background-color: ${({ theme }) => theme.color.green};
  color: white;
  font-size: 0.8rem;
`;

export default function Header({ socket }) {
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const [isSignIn, setIsSignIn] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [newroom, setNewRoom] = useState("");
  const location = useLocation();

  // 로그아웃 함수
  const signOut = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("usertype");
    localStorage.removeItem("token");
    handleDropDown();
  };
  // 드롭다운 메뉴 보이기
  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const getNewRoom = async () => {
    try {
      const res = await api.get(`/chat/new?userid=${userid}`);
      if (res.data.success) {
        const roomdata = res.data.data;
        setNewRoom(roomdata);
      }
    } catch (err) {
      console.log("Error getting new room", err);
    }
  };

  useEffect(() => {
    // 유저 로그인 상태 체크
    const token = localStorage.getItem("token");
    setIsSignIn(token);
  }, [location.pathname]);

  useEffect(() => {
    getNewRoom();
  }, []);

  return (
    <StyledHeader usertype={usertype}>
      <InnerHeader>
        {/* left menu */}
        <div>
          <Menu>
            <li>
              <Link to="/">
                <Logo />
              </Link>
            </li>
            {isSignIn && (
              <>
                <li>
                  <Link to="/request">잡아줘요</Link>
                </li>
                <li>
                  <Link to="/trade-list">이용내역</Link>
                </li>
              </>
            )}
          </Menu>
        </div>
        {/* right menu */}
        <div>
          <Menu>
            {isSignIn ? (
              <>
                <GapItems>
                  {newroom > 0 && <Alarm>{newroom}</Alarm>}
                  <li>
                    <Link to="/chat">채팅</Link>
                  </li>
                </GapItems>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={handleDropDown}
                >
                  <Span $fontWeight="700" $textColor="black">
                    {userid}
                  </Span>
                  님
                  {showDropDown ? <KeyboardArrowUpRoundedIcon /> : <KeyboardArrowDownRoundedIcon />}
                </li>
                {showDropDown ? (
                  <DropDown>
                    <DropMenu onClick={handleDropDown}>
                      <Link style={{ padding: "1rem", width: "100%" }} to="/mypage">
                        마이페이지
                      </Link>
                    </DropMenu>
                    {usertype === "B" ? (
                      <DropMenu onClick={handleDropDown}>
                        <Link style={{ padding: "1rem", width: "100%" }} to="/profile">
                          프로필
                        </Link>
                      </DropMenu>
                    ) : (
                      ""
                    )}
                    <DropMenu onClick={signOut}>
                      <Link style={{ padding: "1rem", width: "100%" }} to="/">
                        로그아웃
                      </Link>
                    </DropMenu>
                  </DropDown>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <li>
                  <Link to="/sign-in">로그인</Link>
                </li>
                <li>
                  <Link to="/sign-up">회원가입</Link>
                </li>
              </>
            )}
          </Menu>
        </div>
      </InnerHeader>
    </StyledHeader>
  );
}
