import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BusterProfile from "../components/form/BusterProfile";
import CommonForm from "../components/form/CommonForm";
import api from "../api";

export default function SignUpDetail() {
  const [authComplete, setAuthComplete] = useState(false);
  const { usertype } = useParams();
  const isBuster = usertype === "buster" ? true : false;
  const navigate = useNavigate();
  const [submitCommonForm, setSubmitCommonForm] = useState(false);

  // 공통 회원가입 폼 제출
  const handleCommonForm = async (data) => {
    try {
      
      // 마지막 점검 후 활성화
      // if (!authComplete) {
      //   alert("휴대폰 인증을 진행해주세요.");
      //   return;
      // }
      const isExist = await api.get(`/auth/isexist?userid=${data.userid}`);
      console.log(isExist.data);
      if(isExist.data.success) {
        alert("중복된 아이디입니다.")
        return;
      }
      const res = await api.post("/auth/sign-up", data);
      if (res.data.success) {
        // usertype 무서버일 경우
        if (!isBuster) {
          navigate("/sign-in");
        }
        // usertype 버스터일 경우
        else {
          navigate(`/buster?userid=${data.userid}`);
          setSubmitCommonForm(true);
        }
      }
    } catch (err) {
      console.log("Error submitting common form", err);
    }
  };

  return (
    <div className="Wrapper">
      <div className="Content">
        <h1>{isBuster ? "버스터" : "무서버"} 회원가입</h1>
        {submitCommonForm ? (
          ""
        ) : (
          <CommonForm
            handleCommonForm={handleCommonForm}
            authComplete={authComplete}
            setAuthComplete={setAuthComplete}
          />
        )}
        {submitCommonForm && isBuster ? <BusterProfile /> : ""}
      </div>
    </div>
  );
}
