import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import GapItems from "../components/common/GapItems";
import { Span, P } from "../components/common/Text";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";

export default function Landing() {
  return (
    <main style={{ marginTop: "-1rem" }}>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F4F8F0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GapItems $col $left $gap="3rem">
            <GapItems $col $left $gap="1rem">
              <h1
                style={{
                  textAlign: "left",
                  fontSize: "3rem",
                  fontWeight: "500",
                }}
              >
                징그러운 벌레,
              </h1>
              <h1
                style={{
                  textAlign: "left",
                  fontSize: "3rem",
                  fontWeight: "500",
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
        </div>
      </section>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "6rem 0",
          backgroundColor: "#E0EDC9",
        }}
      >
        <div className="Content">
          <h1>거래는 이렇게 진행돼요</h1>
          <GapItems $gap="1rem">
            <GapItems $col $left $bgColor="white" $padding="1.5rem" $borderRadius="1rem">
              <P $fontSize="xl" $textColor="darkgreen">
                <ArticleRoundedIcon fontSize="inherit" />
              </P>
              <P $fontWeight="600">잡아줘요</P>
              <Span $textColor="gray05">
                무서버가 작성한 요청글에 대해
                버스터는 채팅을 걸 수 있어요.
              </Span>
            </GapItems>
            <GapItems $col $left $bgColor="white" $padding="1.5rem" $borderRadius="1rem">
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
            <GapItems $col $left $bgColor="white" $padding="1.5rem" $borderRadius="1rem">
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
        </div>
      </section>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "3rem 0",
          backgroundColor: "#F4F4F4",
        }}
      >
        <div className="Content">
          <h1>
            수많은 버스터가
            <br />
            무서버님을 기다리고 있어요
          </h1>
          <GapItems>
            <Button $color="lightgreen" $size="lg">
              빨라요
            </Button>
            <Button $color="lightgreen" $size="lg">
              침착해요
            </Button>
            <Button $color="lightgreen" $size="lg">
              시간을 잘 지켜요
            </Button>
            <Button $color="lightgreen" $size="lg">
              꼼꼼해요
            </Button>
            <Button $color="lightgreen" $size="lg">
              터프해요
            </Button>
          </GapItems>
          <GapItems>
            <div
              style={{
                padding: "1rem",
                background: "white",
                borderRadius: "1rem",
                border: "1px solid gray",
              }}
            >
              <div
                style={{ width: "100px", height: "100px", background: "gray" }}
              />
            </div>
            <div
              style={{
                padding: "1rem",
                background: "white",
                borderRadius: "1rem",
                border: "1px solid gray",
              }}
            >
              <div
                style={{ width: "100px", height: "100px", background: "gray" }}
              />
            </div>
            <div
              style={{
                padding: "1rem",
                background: "white",
                borderRadius: "1rem",
                border: "1px solid gray",
              }}
            >
              <div
                style={{ width: "100px", height: "100px", background: "gray" }}
              />
            </div>
          </GapItems>
        </div>
      </section>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "3rem 0",
        }}
      >
        <div className="Content">
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
        </div>
      </section>
    </main>
  );
}
