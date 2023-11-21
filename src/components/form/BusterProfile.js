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
  const [selfintro, setSelfIntro] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  console.log(watch());

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

  const onTextareaHandler = (e) => {
    setSelfIntro(e.target.value.replace(/[\u3131-\uD79D]/g, "A").length);
  };

  // 버스터 프로필 정보 가져오기
  useEffect(() => {
    if (busterid) {
      getData();
      getTrade();
    }
  }, []);

  useEffect(() => {
    if (busterid) {
      setValue("selfintro", data?.selfintro);
      setValue("tech", data?.tech);
      setValue("exp", data?.exp);
      setValue("fav", data?.fav);
      setValue("accbank", data?.accbank);
      setValue("accno", data?.accno);
    }
  }, [data]);

  useEffect(() => {
    if (busterid) {
      getCompleteTrade();
      getReviews();
    }
  }, [trade]);

  useEffect(() => {
    showReview();
  }, [reviews]);

  console.log(watch());

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
              <img style={{ width: "100px" }} src={`${img}`} alt="Profile" />
            )}
            <ImageUpload id="profile" setValue={setValue} />
          </GapItems>
          <GapItems $col $left>
            <label htmlFor="selfintro">자기소개</label>
            <GapItems>
              <textarea
                {...register("selfintro", {
                  required: true,
                  minLength: 10,
                  maxLength: 200,
                })}
                onChange={onTextareaHandler}
                defaultValue={busterid ? data.selfintro : ""}
                id="selfintro"
                placeholder="소개글을 작성해주세요."
                autoFocus
              />
              {errors.selfintro?.type === "required" && (
                <Span $textColor="alert">자기소개를 입력해주세요.</Span>
              )}
              {errors.selfintro?.type === "minLength" && (
                <Span $textColor="alert">최소 10자 이상 입력해주세요.</Span>
              )}
              {errors.selfintro?.type === "maxLength" && (
                <Span $textColor="alert">최대 글자수는 200자 입니다.</Span>
              )}
              <div style={{ marginLeft: "auto" }}>
                <Span>{selfintro} / 200</Span>
              </div>
            </GapItems>
          </GapItems>
          <GapItems $col $left>
            <label htmlFor="tech">기술</label>
            <GapItems>
              <input
                {...register("tech", { required: true })}
                defaultValue={busterid ? data.tech : ""}
                placeholder="나만의 벌레 잡는 기술! (예: 손으로 잡기, 에X킬라)"
                id="tech"
              />
              {errors.tech?.type === "required" && (
                <Span $textColor="alert">기술을 입력해주세요.</Span>
              )}
            </GapItems>
          </GapItems>
          <GapItems $col $left>
            <label htmlFor="exp">벌레 잡은 경험</label>
            <GapItems>
              <input
                {...register("exp", { required: true })}
                defaultValue={busterid ? data.exp : ""}
                placeholder="특별하게 기억 남는 벌레 잡은 경험은?"
                id="exp"
              />
              {errors.exp?.type === "required" && (
                <Span $textColor="alert">벌레 잡은 경험을 입력해주세요.</Span>
              )}
            </GapItems>
          </GapItems>
          <GapItems $col $left>
            <label htmlFor="fav">가장 잘 잡는 벌레</label>
            <GapItems>
              <input
                {...register("fav", { required: true })}
                defaultValue={busterid ? data.fav : ""}
                placeholder="이 벌레는 내가 제일 잘 잡아!"
                id="fav"
              />
              {errors.fav?.type === "required" && (
                <Span $textColor="alert">
                  가장 잘 잡는 벌레를 입력해주세요.
                </Span>
              )}
            </GapItems>
          </GapItems>
          <GapItems $col $left>
            <label htmlFor="accbank">계좌번호</label>
            <GapItems>
              <select
                {...register("accbank", { required: true })}
                defaultValue={busterid ? data.accbank : "카카오뱅크"}
                id="accbank"
                placeholder="은행 선택"
              >
                <option value="KA">카카오뱅크</option>
                <option value="TS">토스뱅크</option>
                <option value="KB">국민은행</option>
                <option value="SH">신한은행</option>
                <option value="NH">농협</option>
                <option value="IB">기업은행</option>
                <option value="HN">하나은행</option>
                <option value="KY">케이뱅크</option>
              </select>
              <input
                {...register("accno", { required: true })}
                defaultValue={busterid ? data.accno : ""}
                placeholder="계좌번호를 입력해주세요."
                id="accno"
                type="number"
              />
            </GapItems>
          </GapItems>
          {errors.tech?.type === "required" && (
            <Span $textColor="alert">계좌번호를 입력해주세요.</Span>
          )}
          {busterid && (
            <>
              <label htmlFor="review">퇴치건수</label>
              <P>{completeTrade}</P>
              <label htmlFor="review">리뷰</label>
              <GapItems>{showReview()}</GapItems>
            </>
          )}
          <Button $color="green" $size="lg" $fullwidth>
            {busterid ? "프로필 수정" : "프로필 입력(2 / 2)"}
          </Button>
        </Container>
      </form>
    </div>
  );
}
