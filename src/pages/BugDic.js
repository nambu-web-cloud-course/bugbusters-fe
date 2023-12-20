import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { set, useForm } from "react-hook-form";
import { Span, P } from "../components/common/Text";
import { Link, useNavigate } from "react-router-dom";
import ImageUpload from "../components/common/ImageUpload";

import GapItems from "../components/common/GapItems";
import Badge from "../components/common/Badge";
import formatDateTime from "../utils/formatDateTime";
import { useEffect, useState } from "react";
import api from "../api";
import axios from "axios";

export default function BugDic() {
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [userinfo, setUserInfo] = useState({});
  const [contentLength, setContentLength] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // const { getJson } = require("serpapi");

  
  // 폼에 입력한 데이터 서버에 전송
  const onSubmit = async (data) => { 
    try {
      setSubmitted(true);
      console.log(data.images[0]);
      const res = await api.post(`/search?image=${data.images[0]}`);
      // if (res.data.success) {
      //   navigate("/trade-list");
      // }
      console.log(res.data);
      setData(res.data);
      
      // if (res.data.success) {
      //   navigate("/trade-list");
      // }
    } catch (err) {
      console.log("Error submitting request", err);
    }
  };


  
  
  return (
    <>
      {token ? (
        <div className="Wrapper">
          <div className="Content">
            <h1>벌레 찾기</h1>
            <GapItems $col $gap="1rem">  
 

                <form className="Content" onSubmit={handleSubmit(onSubmit)}>
                  <Container>
                    <input
                      style={{ display: "none" }}
                      {...register("userid", { required: true })}
                      id="userid"
                      defaultValue={userid}
                    />
                    <GapItems $col $left>
                      <label htmlFor="content">벌레사진을 올려주세요.</label>
                    </GapItems>
                    <ImageUpload
                      id="bugdic"
                      userid={userid}
                      setValue={setValue}
                    />
                    <Button $color="green" $size="lg" $fullwidth>
                      검색
                    </Button>
                  </Container>
                </form>
                {(data.length == 0 && submitted )? (
                  <Container>검색결과가 없습니다.</Container>
                 ) : (
                  <GapItems $col $gap="1rem">
                    {data.map((item) => (
                      <Container key={item.id}>
                        <span>{item.title} | {item.subtitle}</span>
                        <a href={item.link} target="_blank"><img src={item.thumbnail} width="100px" height="100px" /></a>
                 
                  </Container>
                ))}
                  </GapItems>
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
