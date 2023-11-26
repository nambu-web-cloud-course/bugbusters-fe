import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import GapItems from "../components/common/GapItems";
import { Span, P } from "../components/common/Text";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import api from "../api";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $bgColor, theme }) => $bgColor || theme.color.gray01};
  padding: ${({ $padding }) => $padding || 0};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  position: relative;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 14rem;
  gap: 0.5rem;
`;

const Rank = styled.span`
  position: absolute;
  top: -10px;
  left: 0%;
  transform: translateX(-50%);
  padding: 0.75rem 1rem;
  border-radius: 100rem;
  background-color: ${({ theme }) => theme.color.green};
  font-size: 1rem;
  color: white;
  z-index: 1;
`;

export default function Landing() {
  const [bestBuster, setBestBuster] = useState([]);
  const [rankByReview, setRankByReview] = useState([]);
  const [revCode, setRevCode] = useState(1);
  const [keyword, setKeyword] = useState(["빠른", "침착한", "친절한", "꼼꼼한", "터프한"]);
  const REV_CODE = "revcode" + revCode
  
  const getBestBuster = async () => {
    try {
      const res = await api.get("/best");
      const busterData = res.data.data;
      setBestBuster(busterData);
    } catch (err) {
      console.log("Error fetching best buster", err);
    }
  };

  const getRankByReview = async () => {
    try {
      const res = await api.get(`/best/review?review=${revCode}`);
      const busterData = res.data.data;
      setRankByReview(busterData);
    } catch (err) {
      console.log("Error fetching rank by review", err);
    }
  };

  const handleClick = (e) => {
    setRevCode(e.target.value);
  };

  useEffect(() => {
    getBestBuster();
  }, []);

  useEffect(() => {
    getRankByReview();
  }, [revCode]);

  return (
    <main style={{ marginTop: "-1rem" }}>
      <Section>
        <Content>
          <GapItems $col $left $gap="3rem">
            <GapItems $col $left $gap="1rem">
              <h1
                style={{
                  textAlign: "left",
                  fontSize: "3rem",
                  fontWeight: "600",
                }}
              >
                징그러운 벌레,
              </h1>
              <h1
                style={{
                  textAlign: "left",
                  fontSize: "3rem",
                  fontWeight: "600",
                }}
              >
                버스터가 잡아드려요
              </h1>
            </GapItems>
            <P $fontSize="lg" $textColor="gray04" $fontWeight="400">
              갑자기 벌레가 나타나 놀라신 무서버님,
              <br />
              버스터에게 퇴치를 요청해보세요.
            </P>
            <GapItems>
              <Link to="/sign-up/user">
                <Button $color="lightgreen" $size="xl">
                  <P $textAlign="center" $fontWeight="600">
                    무서버로 시작하기
                  </P>
                </Button>
              </Link>
              <Link to="/sign-up/buster">
                <Button $color="green" $size="xl">
                  <GapItems $col>
                    <P $textAlign="center" $fontWeight="600">
                      버스터로 시작하기
                    </P>
                  </GapItems>
                </Button>
              </Link>
            </GapItems>
          </GapItems>
          <img
            src="img/buster.png"
            alt="버스터.png"
            width="540px"
            style={{ marginRight: "-160px" }}
          />
        </Content>
      </Section>
      <Section $padding="6rem 0" $bgColor="#E4F1CF">
        <Content>
          <GapItems $col $gap="4rem">
            <h1>거래는 이렇게 진행돼요</h1>
            <GapItems $gap="1rem">
              <GapItems
                $col
                $left
                $bgColor="white"
                $padding="1.5rem"
                $borderRadius="1rem"
              >
                <P $fontSize="xl" $textColor="darkgreen">
                  <ArticleRoundedIcon fontSize="inherit" />
                </P>
                <P $fontWeight="600">잡아줘요</P>
                <Span $textColor="gray05">
                  무서버가 작성한 요청글에 대해 버스터는 채팅을 걸 수 있어요.
                </Span>
              </GapItems>
              <GapItems
                $col
                $left
                $bgColor="white"
                $padding="1.5rem"
                $borderRadius="1rem"
              >
                <P $fontSize="xl" $textColor="darkgreen">
                  <TextsmsRoundedIcon fontSize="inherit" />
                </P>
                <P $fontWeight="600">채팅</P>
                <Span $textColor="gray05">
                  무서버와 버스터는 채팅을 통해
                  <br />
                  거래 여부를 결정해요.
                </Span>
              </GapItems>
              <GapItems
                $col
                $left
                $bgColor="white"
                $padding="1.5rem"
                $borderRadius="1rem"
              >
                <P $fontSize="xl" $textColor="darkgreen">
                  <CreditCardRoundedIcon fontSize="inherit" />
                </P>
                <P $fontWeight="600">거래</P>
                <Span $textColor="gray05">
                  카드 결제로 거래가 완료되면
                  <br />
                  버스터의 계좌에 금액이 입금돼요.
                </Span>
              </GapItems>
            </GapItems>
          </GapItems>
        </Content>
      </Section>
      <Section $padding="6rem 0">
        <Content>
          <GapItems $col $gap="3rem 0">
            <h1>{keyword[revCode-1]} 버스터가 항시 대기중!</h1>
            <GapItems $center>
              <Button
                $color="lightgreen"
                $size="lg"
                type="button"
                value="1"
                onClick={handleClick}
              >
                빨라요
              </Button>
              <Button
                $color="lightgreen"
                $size="lg"
                type="button"
                value="2"
                onClick={handleClick}
              >
                침착해요
              </Button>
              <Button
                $color="lightgreen"
                $size="lg"
                type="button"
                value="3"
                onClick={handleClick}
              >
                친절해요
              </Button>
              <Button
                $color="lightgreen"
                $size="lg"
                type="button"
                value="4"
                onClick={handleClick}
              >
                꼼꼼해요
              </Button>
              <Button
                $color="lightgreen"
                $size="lg"
                type="button"
                value="5"
                onClick={handleClick}
              >
                터프해요
              </Button>
            </GapItems>
            <GapItems $gap="1rem">
              {rankByReview.map((buster) => (
                <Card key={buster?.busterid}>
                  <P $textColor="darkgreen" $fontSize="lg" $fontWeight="600">
                    {buster?.busterid}
                  </P>
                  <Span $textColor="black">
                    리뷰 개수: {buster?.[REV_CODE]}
                  </Span>
                </Card>
              ))}
            </GapItems>
          </GapItems>
        </Content>
      </Section>
      <Section $bgColor="#F0F7E4" $padding="6rem 0">
        <Content>
          <GapItems $col $gap="3rem 0">
            <h1>이만큼이나 잡았어요</h1>
            <GapItems $gap="2rem">
              {bestBuster.map((buster, idx) => (
                <Card key={buster?.id}>
                  <Rank>{idx + 1}</Rank>
                  <img style={{ width: "50px" }} src={`${buster?.profile}`} />
                  <P $textColor="darkgreen" $fontSize="lg" $fontWeight="600">
                    {buster?.userid}
                  </P>
                  <Span $textColor="black">
                    {buster?.selfintro.slice(0, 10) + "..."}
                  </Span>
                  <GapItems $gap="0.25rem" $center>
                    <Span $textColor="darkgreen">
                      <BugReportRoundedIcon fontSize="small" color="inherit" />
                    </Span>
                    <Span $textColor="black">
                      퇴치 건수: {buster?.tradecount}
                    </Span>
                  </GapItems>
                </Card>
              ))}
            </GapItems>
          </GapItems>
        </Content>
      </Section>
      <Section $bgColor="white" $padding="6rem 0">
        <Content>
          <GapItems $col $gap="3rem">
            <P $fontSize="lg" $fontWeight="500">
              지금 바로 버그버스터즈를 이용해보세요
            </P>
            <GapItems>
              <Link to="/sign-up/user">
                <Button $color="lightgreen" $size="xl">
                  <P $textAlign="center" $fontWeight="600">
                    무서버로 시작하기
                  </P>
                </Button>
              </Link>
              <Link to="/sign-up/buster">
                <Button $color="green" $size="xl">
                  <GapItems $col>
                    <P $textAlign="center" $fontWeight="600">
                      버스터로 시작하기
                    </P>
                  </GapItems>
                </Button>
              </Link>
            </GapItems>
          </GapItems>
        </Content>
      </Section>
    </main>
  );
}
