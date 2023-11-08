import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyledHeader = styled.header`
  top: 0;
  position: fixed;
  width: 100%;
  height: 3.5rem;
  background-color: white;
  border-bottom: 1px solid black;
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

const SubMenu = styled.ul`
  border: 1px solid black;
`;

export default function Header() {
  return (
    <StyledHeader>
      {/* inner header */}
      <InnerHeader>
        {/* left menu */}
        <div>
          <Menu>
            <li>
              <Link to="/request">
                {/* 로고 파일 svg? img? */}
                <h4>BugBusters</h4>
              </Link>
            </li>
            <li>
              <Link to="/request">잡아줘요</Link>
            </li>
            <li>
              <Link to="/trade-list">이용내역</Link>
            </li>
          </Menu>
        </div>
        {/* right menu */}
        <div>
          <Menu>
            <li>
              <Link to="/chat">채팅</Link>
            </li>
            <li>
              <Link to="/signin">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
            <li>
              {/* 클릭시 아래 SubMenu 나타남 */}
              <button>username님</button>
              <div>
                <SubMenu>
                  <li>
                    <Link to="/signout">로그아웃</Link>
                  </li>
                  <li>
                    <Link to="/MyPage">마이페이지</Link>
                  </li>
                </SubMenu>
              </div>
            </li>
          </Menu>
        </div>
      </InnerHeader>
    </StyledHeader>
  );
}
