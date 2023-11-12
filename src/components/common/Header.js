import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { DropDown, DropMenu } from "./DropDown";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
const StyledHeader = styled.header`
  top: 0;
  position: fixed;
  width: 100%;
  height: 3.5rem;
  /* 버스터가 로그인했으면 헤더 색상 초록색으로 변경 */
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray02};
  display: flex;
  justify-content: center;
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

export default function Header() {
  // 로그인 여부
  const [isSignIn, setIsSignIn] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const uid = localStorage.getItem("userid");
  const userid = JSON.parse(uid);
  const location = useLocation();

  // 로그아웃 함수
  const signout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
  };

  // 드롭다운 메뉴 보이기
  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  useEffect(() => {
    // 유저 로그인 상태 체크
    const token = localStorage.getItem("token");
    setIsSignIn(token);
  });

  return (
    <StyledHeader>
      <InnerHeader>
        {/* left menu */}
        <div>
          <Menu>
            <li>
              <Link to={isSignIn ? "/request" : "/landing"}>
                <img width="120px" src="img/logo.png" alt="" />
              </Link>
            </li>
            {isSignIn ? (
              <>
                <li>
                  {/* 무서버? /request : /reqlist */}
                  <Link to="/request">잡아줘요</Link>
                </li>
                <li>
                  <Link to="/trade-list">이용내역</Link>
                </li>
              </>
            ) : (
              ""
            )}
          </Menu>
        </div>
        {/* right menu */}
        <div>
          <Menu>
            {isSignIn ? (
              <>
                <li>
                  <Link to="/chat">채팅</Link>
                </li>
                {/* 닉네임 + 님 메뉴*/}
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={handleDropDown}
                >
                  <span style={{ fontWeight: 700 }}>{userid}</span>님
                  {showDropDown ? (
                    <KeyboardArrowUpRoundedIcon />
                  ) : (
                    <KeyboardArrowDownRoundedIcon />
                  )}
                </li>
                {showDropDown ? (
                  <DropDown>
                    <DropMenu href="/mypage">마이페이지</DropMenu>
                    <DropMenu onClick={signout} href="/landing">
                      로그아웃
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
