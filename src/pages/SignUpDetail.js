import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import BusterProfile from "../components/molecule/BusterProfile";
import CommonForm from "../components/molecule/CommonForm";
import api from "../api";

export default function SignUpDetail() {
  const { usertype } = useParams();

  // URL 파라미터에 따라 무서버/버스터 결정
  const isBuster = usertype === "buster" ? true : false;
  const navigate = useNavigate();
  const [submitCommonForm, setSubmitCommonForm] = useState(false);

  // 공통 회원가입 폼 제출
  const handleCommonForm = async (data) => {
    try {
      const res = await api.post("/auth/sign-up", data);
      console.log(`response: ${res.data}`);
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
      console.log("Common Form Submit Error", err);
    }
  };

  return (
    <div className="Content">
      <h1>{isBuster ? "버스터" : "무서버"} 회원가입</h1>
      {submitCommonForm ? (
        ""
      ) : (
        <CommonForm handleCommonForm={handleCommonForm} />
      )}
      {submitCommonForm && isBuster ? <BusterProfile /> : ""}
    </div>
  );
}
