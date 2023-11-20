import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
import { Span, P } from "../components/common/Text";
import { Link, useNavigate } from "react-router-dom";
import ImageUpload from "../components/common/ImageUpload";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import GapItems from "../components/common/GapItems";
import Badge from "../components/common/Badge";
import formatDateTime from "../utils/formatDateTime";
import { useEffect, useState } from "react";
import api from "../api";

export default function Request() {
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userinfo, setUserInfo] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // 모든 요청 데이터 가져오기
  const getData = async () => {
    try {
      const res = await api.get("/request");
      if (res.data.success) {
        const reqData = res.data.data;
        const filteredData = reqData.filter((data) => data.state === "PR");
        setData(filteredData);
      } else {
        console.log("Error fetching All Request");
      }
    } catch (err) {
      console.log("Error fetching All Request: ", err);
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await api.get(`/auth?userid=${userid}`);
      const data = res.data.data;
      setUserInfo(data);

      // Set default values using setValue
      setValue("userid", userid);
      setValue("content", "");
      setValue("gender", "A");
      setValue("addr1", data?.addr1);
      setValue("addr2", data?.addr2);
      setValue("zipcode", data?.zipcode);
      setValue("sido", data?.sido);
      setValue("sigungu", data?.sigungu);
    } catch (err) {
      console.log("Error getting user info", err);
    }
  };

  // 폼에 입력한 데이터 서버에 전송
  const onSubmit = async (data) => {
    try {
      const res = await api.post("/request", data);
      if (res.data.success) {
        navigate("/trade-list");
      }
    } catch (err) {
      console.log("Error submitting request", err);
    }
  };

  useEffect(() => {
    if (usertype === "B") getData();
    else getUserInfo();
  }, []);

  return (
    <div className="Content">
      <h1>잡아줘요</h1>
      {usertype === "B" ? (
        // 버스터
        data.length > 0 ? (
          data.map((item) => (
            // 각 컨테이너 클릭시 상세페이지로 이동
            <Link to={`/request/${item.id}`} key={item.id}>
              <Container key={item.id}>
                <p>{item.content}</p>
                <GapItems>
                  <Badge>
                    <LocationOnRoundedIcon fontSize="small" />
                    {item.sido} {item.sigungu}
                  </Badge>
                  <Badge>
                    <PersonRoundedIcon fontSize="small" />
                    {item.gender === "F"
                      ? "여자"
                      : item.gender === "M"
                      ? "남자"
                      : "성별무관"}
                  </Badge>
                  <Badge>
                    <CreditCardRoundedIcon fontSize="small" />
                    {item.price.toLocaleString()}
                  </Badge>
                </GapItems>
                <Span>
                  {formatDateTime(item.createdAt)} | 작성자: {item.userid}
                </Span>
              </Container>
            </Link>
          ))
        ) : (
          <Container>요청사항이 없습니다.</Container>
        )
      ) : (
        // 유저(무서버)
        <form className="Content" onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <input
              style={{ display: "none" }}
              {...register("userid", { required: true })}
              id="userid"
              defaultValue={userid}
            />
            <label htmlFor="content">요청사항</label>
            <textarea
              {...register("content", { required: true })}
              placeholder="벌레 종류, 나타난 위치 등 상세한 정보를 입력해주세요."
              id="content"
            />
            <label htmlFor="price">가격</label>
            <Span>버스터와 협의 후 최종 가격으로 거래를 진행합니다.</Span>
            <input
              {...register("price", { required: true })}
              placeholder="최소 금액 10,000원"
              min={10000}
              id="price"
            />
            <label htmlFor="gender">성별</label>
            <div className="select">
              <input
                {...register("gender")}
                value="A"
                type="radio"
                id="A"
                defaultChecked
              />
              <label htmlFor="A">성별무관</label>
              <input {...register("gender")} value="F" type="radio" id="F" />
              <label htmlFor="F">여자</label>
              <input {...register("gender")} value="M" type="radio" id="M" />
              <label htmlFor="M">남자</label>
            </div>
            <label htmlFor="addr1">주소</label>
            <input
              {...register("addr1", { required: true })}
              defaultValue={userinfo?.addr1}
            />
            <label htmlFor="addr2">상세주소</label>
            <Span>
              버스터의 요청 목록에서는 보이지 않으며, 거래 진행시 전송할 수
              있습니다.
            </Span>
            <input
              {...register("addr2", { required: true })}
              defaultValue={userinfo?.addr2}
            />
            <div style={{ display: "none" }}>
              <label htmlFor="zipcode">우편번호</label>
              <input
                {...register("zipcode")}
                defaultValue={userinfo?.zipcode}
              />
              <label htmlFor="sido">시도</label>
              <input {...register("sido")} defaultValue={userinfo?.sido} />
              <label htmlFor="sigungu">시군구</label>
              <input
                {...register("sigungu")}
                defaultValue={userinfo?.sigungu}
              />
            </div>
            <GapItems>
              <label htmlFor="addr1">이미지</label>
              <Span>(옵션) 최대 3장</Span>
            </GapItems>
            <ImageUpload id="request" userid={userid} setValue={setValue} />
            <Button $color="green" $size="lg" $fullwidth>
              글 작성
            </Button>
          </Container>
        </form>
      )}
    </div>
  );
}
