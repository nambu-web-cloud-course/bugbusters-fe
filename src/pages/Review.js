import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/common/Container";
import GapItems from "../components/common/GapItems";
import Button from "../components/common/Button";
import api from "../api";
import UserInfo from "../components/common/UserInfo";
import { P, Span } from "../components/common/Text";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export default function Review() {
  const { tradeid, busterid } = useParams();
  const [submitReview, setSubmitReview] = useState(false);
  const [busterProfile, setBusterProfile] = useState([]);
  const [userinfo, setUserInfo] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();

  const getUserInfo = async () => {
    try {
      const res = await api.get(`/auth?userid=${busterid}`);
      const userData = res.data.data;
      setUserInfo(userData);
    } catch (err) {
      console.log("Error fetching user data", err);
    }
  };

  const getBusterProfile = async () => {
    try {
      const res = await api.get(`/auth/buster?userid=${busterid}`);
      if (res.data.success) {
        const data = res.data.data;
        setBusterProfile(data);
      } else {
        console.log("Error fetching buster profile");
      }
    } catch (err) {
      console.log("Error fetching buster profile", err);
    }
  };

  const writeReview = async (data) => {
    let arr = [];

    Object.keys(data).forEach((keyword) => {
      data[keyword] && arr.push(keyword);
    });

    const review = {
      rev1: arr[0],
      rev2: arr[1],
      rev3: arr[2],
    };

    if (arr.length >= 1 && arr.length <= 3) {
      try {
        const res = await api.put(`/trade/${tradeid}`, review);
        if (res.data.success) {
          setSubmitReview(!submitReview);
        } else {
          console.log("Error writing review");
        }
      } catch (err) {
        console.log("Error writing review", err);
      }
    } else {
      alert("최소 1개 이상, 최대 3개의 키워드를 선택해주세요.");
    }
  };

  useEffect(() => {
    getBusterProfile();
    getUserInfo();
  }, []);

  return (
    <>
      {token ? (
        <div className="Content">
          {submitReview ? (
            <Container>
              <h1>리뷰를 작성했습니다.</h1>
              <Button
                color="green"
                size="lg"
                fullwidth
                onClick={() => {
                  navigate("/trade-list");
                }}
              >
                이용내역으로 이동
              </Button>
            </Container>
          ) : (
            <>
              <h1>리뷰</h1>
              <form onSubmit={handleSubmit(writeReview)}>
                <Container>
                  <UserInfo
                    busterid={busterid}
                    usertype={usertype}
                    sido={userinfo?.sido}
                    sigungu={userinfo?.sigungu}
                    tradecount={busterProfile?.tradecount}
                    profile={busterProfile?.profile}
                  />
                  <P>
                    거래는 만족스러우셨나요?
                    <br />
                    버스터를 설명할 수 있는 키워드를 선택해주세요.{" "}
                  </P>
                  <Span>최대 3개 선택 가능</Span>
                  <GapItems>
                    <input
                      type="checkbox"
                      id="1"
                      {...register("1")}
                      defaultChecked
                    />
                    <label htmlFor="1">빨라요</label>
                    <input type="checkbox" id="2" {...register("2")} />
                    <label htmlFor="2">침착해요</label>
                    <input type="checkbox" id="3" {...register("3")} />
                    <label htmlFor="3">시간을 잘 지켜요</label>
                    <input type="checkbox" id="4" {...register("4")} />
                    <label htmlFor="4">꼼꼼해요</label>
                    <input type="checkbox" id="5" {...register("5")} />
                    <label htmlFor="5">섬세해요</label>
                  </GapItems>
                  <Button $color="green" $size="lg" $fullwidth>
                    제출
                  </Button>
                </Container>
              </form>
            </>
          )}
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
