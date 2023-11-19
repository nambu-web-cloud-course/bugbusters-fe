import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "../common/Container";
import ImageUpload from "../common/ImageUpload";
import { useState, useEffect } from "react";
import GapItems from "../common/GapItems";
import api from "../../api";
import Badge from "../common/Badge";
import { Span, P } from "../common/Text";

export default function BusterProfile() {
  // 프로필 작성 중인 버스터 아이디
  const url = new URL(window.location.href);
  const signUpID = url.searchParams.get("userid");

  // 회원가입한 버스터 아이디
  const busterid = JSON.parse(localStorage.getItem("userid"));
  const [data, setData] = useState([]);
  const [trade, setTrade] = useState([]);
  const [completeTrade, setCompleteTrade] = useState("");
  const [reviews, setReviews] = useState([]);
  const [img, setImage] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // 회원가입 후 프로필 수정을 위한 정보
  const getData = async () => {
    try {
      const res = await api.get(`/auth/buster?userid=${busterid}`);
      if (res.data.success) {
        const data = res.data.data;
        setData(data);
        setImage(data.profile);
      } else {
        console.log("Error fetching buster profile");
      }
    } catch (err) {
      console.log("Error fetching buster profile", err);
    }
  };

  const getTrade = async () => {
    try {
      const res = await api.get(`/trade?busterid=${busterid}`);
      if (res.data.success) {
        const data = res.data.data;
        setTrade(data);
      } else {
        console.log("Error fetching trade");
      }
    } catch (err) {
      console.log("Error fetching trade", err);
    }
  };

  // 나중에 분리
  const handleBusterProfile = async (data) => {
    // 회원가입 - 버스터 프로필 등록
    if (!busterid) {
      try {
        const res = await api.post("/auth/buster", data);
        console.log("Buster Signup:", res.data);
        if (res.data.success) {
          navigate("/sign-in");
        } else {
          console.log("Error registering buster profile");
        }
      } catch (err) {
        console.log("Error registering buster profile", err);
      }
    }
    // 버스터 프로필 수정
    else {
      try {
        const res = await api.put(`/auth/buster/${busterid}`, data);
        if (res.data.success) {
          alert("프로필 수정 완료");
          getData();
        } else {
          console.log("Error modifying buster profile");
        }
      } catch (err) {
        console.log("Error modifying buster profile", err);
      }
    }
  };

  const getCompleteTrade = () => {
    const arr = [];
    trade.map((item) => {
      item.state === "CP" && arr.push(item);
    });
    setCompleteTrade(arr.length);
  };

  const getReviews = () => {
    let counts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    trade.forEach((item) => {
      if (item.state === "CP" && (item.rev1 || item.rev2 || item.rev3)) {
        counts[item.rev1]++;
        counts[item.rev2]++;
        counts[item.rev3]++;
      }
    });

    setReviews(counts);
  };

  const showReview = () => {
    const reviewCodes = {
      1: "빨라요",
      2: "침착해요",
      3: "시간을 잘 지켜요",
      4: "꼼꼼해요",
      5: "섬세해요",
    };

    const badges = [];
    for (const keyword in reviews) {
      if (reviews[keyword] === 0) continue;
      badges.push(
        <Badge
          key={keyword}
        >{`${reviewCodes[keyword]} ${reviews[keyword]}`}</Badge>
      );
    }
    return badges;
  };

  // 버스터 프로필 정보 가져오기
  useEffect(() => {
    getData();
    getTrade();
  }, []);

  useEffect(() => {
    setValue("selfintro", data?.selfintro);
    setValue("tech", data?.tech);
    setValue("exp", data?.exp);
    setValue("fav", data?.fav);
    setValue("accbank", data?.accbank);
    setValue("accno", data?.accno);
  }, [data]);

  useEffect(() => {
    getCompleteTrade();
    getReviews();
  }, [trade]);

  useEffect(() => {
    showReview();
  }, [reviews]);

  return (
    <div className="Content">
      <h1>{busterid ? "프로필" : "버스터 프로필 작성"}</h1>
      <form onSubmit={handleSubmit(handleBusterProfile)}>
        <Container $size="sm">
          <input
            style={{ display: "none" }}
            {...(busterid ? {} : register("userid", { required: true }))}
            defaultValue={signUpID}
            id="userid"
          />
          <label htmlFor="profile">프로필</label>
          <GapItems>
            {busterid && (
              <img
                style={{ width: "100px" }}
                src={`http://localhost:8080/${img}`}
                alt="Profile"
              />
            )}
            <ImageUpload id="profile" setValue={setValue} />
          </GapItems>
          <label htmlFor="selfintro">자기소개</label>
          <input
            {...register("selfintro", { required: true })}
            defaultValue={busterid ? data.selfintro : ""}
            id="selfintro"
            placeholder="소개글을 작성해주세요."
            autoFocus
          />
          <label htmlFor="tech">기술</label>
          <input
            {...register("tech", { required: true })}
            defaultValue={busterid ? data.tech : ""}
            placeholder="나만의 벌레 잡는 기술! (예: 손으로 잡기, 에X킬라)"
            id="tech"
          />
          <label htmlFor="exp">벌레 잡은 경험</label>
          <input
            {...register("exp", { required: true })}
            defaultValue={busterid ? data.exp : ""}
            placeholder="특별하게 기억 남는 벌레 잡은 경험은?"
            id="exp"
          />
          <label htmlFor="fav">가장 잘 잡는 벌레</label>
          <input
            {...register("fav", { required: true })}
            defaultValue={busterid ? data.fav : ""}
            placeholder="이 벌레는 내가 제일 잘 잡아!"
            id="fav"
          />
          <label htmlFor="accbank">은행</label>
          <input
            {...register("accbank", { required: true })}
            defaultValue={busterid ? data.accbank : ""}
            id="accbank"
            placeholder="은행 선택"
          />
          <label htmlFor="accno">계좌번호</label>
          <input
            {...register("accno", { required: true })}
            defaultValue={busterid ? data.accno : ""}
            placeholder="계좌번호를 입력해주세요."
            id="accno"
          />
          <label htmlFor="review">퇴치건수</label>
          <P>{completeTrade}</P>
          <label htmlFor="review">리뷰</label>
          <GapItems>{showReview()}</GapItems>
          <Button color="green" size="lg" $fullwidth>
            {busterid ? "프로필 수정" : "프로필 입력(2 / 2)"}
          </Button>
        </Container>
      </form>
    </div>
  );
}
