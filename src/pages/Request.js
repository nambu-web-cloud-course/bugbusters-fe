import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
import { Span, P } from "../components/common/Text";
import { Link, useNavigate } from "react-router-dom";
import ImageUpload from "../components/common/ImageUpload";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import GapItems from "../components/common/GapItems";
import Badge from "../components/common/Badge";
import formatDateTime from "../utils/formatDateTime";
import { useEffect, useState } from "react";
import api from "../api";

export default function Request() {
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [filter, setFilter] = useState({
    gender: "A",
    sigungu: "",
    price: "",
  });

  const sigunguArr = [
    "강남구",
    "강동구",
    "강서구",
    "강북구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "동대문구",
    "도봉구",
    "동작구",
    "마포구",
    "서대문구",
    "성동구",
    "성북구",
    "서초구",
    "송파구",
    "영등포구",
    "용산구",
    "양천구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [userinfo, setUserInfo] = useState({});
  const [contentLength, setContentLength] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const getData = async (filter) => {
    try {
      const res = await api.get(
        `/request?gender=${filter?.gender}&sigungu=${filter?.sigungu}&price=${filter?.price}`
      );
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

  const onTextareaHandler = (e) => {
    setContentLength(e.target.value.replace(/[\u3131-\uD79D]/g, "A").length);
  };

  const handleGender = (e) => {
    setFilter({
      ...filter,
      gender: e.target.value,
    });
  };
  const handleSigungu = (e) => {
    setFilter({
      ...filter,
      sigungu: e.target.value,
    });
  };
  const handlePrice = (e) => {
    setFilter({
      ...filter,
      price: e.target.value,
    });
  };

  useEffect(() => {
    usertype === "B" && getData(filter);
  }, [filter]);

  useEffect(() => {
    usertype === "C" && getUserInfo();
  }, []);

  return (
    <>
      {token ? (
        <div className="Wrapper">
          <div className="Content">
            <h1>잡아줘요</h1>
            <GapItems $col $gap="1rem">
              {usertype === "B" && (
                <GapItems>
                  <select onChange={handleGender} id="gender" defaultValue="A">
                    <option value="A">성별</option>
                    <option value="F">여성</option>
                    <option value="M">남성</option>
                  </select>
                  <select onChange={handleSigungu} id="sigungu" defaultValue="">
                    <option value="">지역</option>
                    {sigunguArr.map((sigungu) => (
                      <option value={sigungu}>{sigungu}</option>
                    ))}
                  </select>
                  <select onChange={handlePrice} id="price" defaultValue="">
                    <option value="">가격</option>
                    <option value="1">1만원대</option>
                    <option value="2">2만원대</option>
                    <option value="3">3만원대</option>
                    <option value="4">4만원대</option>
                    <option value="5">5만원 이상</option>
                  </select>
                </GapItems>
              )}
              {usertype === "B" ? (
                data.length > 0 ? (
                  <GapItems $col $gap="1rem">
                    {data.map((item) => (
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
                                ? "여성"
                                : item.gender === "M"
                                ? "남성"
                                : "성별무관"}
                            </Badge>
                            <Badge>
                              <CreditCardRoundedIcon fontSize="small" />
                              {item.price.toLocaleString()}
                            </Badge>
                          </GapItems>
                          <Span>
                            {formatDateTime(item.createdAt)} | 작성자:{" "}
                            {item.userid}
                          </Span>
                        </Container>
                      </Link>
                    ))}
                  </GapItems>
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
                    <GapItems $col $left>
                      <label htmlFor="content">요청사항</label>
                      <textarea
                        {...register("content", {
                          required: {
                            value: true,
                            message: "요청사항을 입력해주세요.",
                          },
                          minLength: {
                            value: 10,
                            message: "최소 10자 이상 입력해주세요.",
                          },
                          maxLength: {
                            value: 200,
                            message: "최대 200자까지 입력 가능합니다.",
                          },
                        })}
                        onChange={onTextareaHandler}
                        placeholder="(최소 10자 이상) 벌레 종류, 나타난 위치 등 상세한 정보를 입력해주세요."
                        id="content"
                      />
                      {errors.content && (
                        <Span $textColor="alert">{errors.content.message}</Span>
                      )}
                      <div style={{ marginLeft: "auto" }}>
                        <Span>{contentLength} / 200</Span>
                      </div>
                    </GapItems>
                    <GapItems $col $left>
                      <label htmlFor="price">가격</label>
                      <Span>
                        버스터와 협의 후 최종 가격으로 거래를 진행합니다.
                      </Span>
                      <input
                        {...register("price", {
                          required: {
                            value: true,
                            message: "가격을 입력해주세요.",
                          },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "숫자만 입력해주세요.",
                          },
                          min: {
                            value: 10000,
                            message: "최소 금액은 10,000원입니다.",
                          },
                        })}
                        placeholder="최소 금액 10,000원"
                        id="price"
                      />
                      {errors.price && (
                        <Span $textColor="alert">{errors.price.message}</Span>
                      )}
                    </GapItems>
                    <GapItems $col $left>
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
                        <input
                          {...register("gender")}
                          value="F"
                          type="radio"
                          id="F"
                        />
                        <label htmlFor="F">여성</label>
                        <input
                          {...register("gender")}
                          value="M"
                          type="radio"
                          id="M"
                        />
                        <label htmlFor="M">남성</label>
                      </div>
                    </GapItems>
                    <GapItems $col $left>
                      <label htmlFor="addr1">주소</label>
                      <Span>버스터의 요청 목록에서 지역, 구까지 보입니다.</Span>
                      <input
                        {...register("addr1", { required: true })}
                        defaultValue={userinfo?.addr1}
                        disabled
                      />
                    </GapItems>
                    <GapItems $col $left>
                      <label htmlFor="addr2">상세주소</label>
                      <Span>
                        버스터의 요청 목록에서는 보이지 않으며, 거래 진행시
                        전송할 수 있습니다.
                      </Span>
                      <input
                        {...register("addr2", { required: true })}
                        defaultValue={userinfo?.addr2}
                        disabled
                      />
                    </GapItems>
                    <div style={{ display: "none" }}>
                      <label htmlFor="zipcode">우편번호</label>
                      <input
                        {...register("zipcode")}
                        defaultValue={userinfo?.zipcode}
                      />
                      <label htmlFor="sido">시도</label>
                      <input
                        {...register("sido")}
                        defaultValue={userinfo?.sido}
                      />
                      <label htmlFor="sigungu">시군구</label>
                      <input
                        {...register("sigungu")}
                        defaultValue={userinfo?.sigungu}
                      />
                    </div>
                    <GapItems>
                      <label htmlFor="addr1">이미지</label>
                      <Span>(옵션) 최대 2장</Span>
                    </GapItems>
                    <ImageUpload
                      id="request"
                      userid={userid}
                      setValue={setValue}
                    />
                    <Button $color="green" $size="lg" $fullwidth>
                      글 작성
                    </Button>
                  </Container>
                </form>
              )}
            </GapItems>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
