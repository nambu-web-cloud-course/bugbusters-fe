import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyledHeader = styled.header`
  top: 0;
  position: fixed;
  width: 100%;
  height: 3.5rem;
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
  return (
    <StyledHeader>
      {/* inner header */}
      <InnerHeader>
        {/* left menu */}
        <div>
          <Menu>
            <li>
              {/* 로그인 하기 전이면 landing / 했으면 잡아줘요 
              무서버(유저)면 글작성 Request page / 버스터는 작성 목록 */}
              <Link to="/landing">
                <img width="120px" src="img/logo.png" alt="" />
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
              <Link to="/sign-in">로그인</Link>
            </li>
            <li>
              <Link to="/sign-up">회원가입</Link>
            </li>
            <button>
              유저님
            </button>
          </Menu>
        </div>
      </InnerHeader>
    </StyledHeader>
  );
}
