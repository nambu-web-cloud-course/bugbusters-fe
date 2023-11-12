import Container from "../components/common/Container";
import Badge from "../components/common/Badge";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { GapItems } from "../components/common/Items";
import { Span } from "../components/common/Text";
import Tabs from "../components/common/Tabs";
import axios from "axios";
import { useEffect, useState } from "react";
import formatDate from "../utils/formatData";

export default function TradeList() {
  // 탭 상태 (진행중 PR, 취소 CA, 완료 CP)
  const [selectedTab, setSelectedTab] = useState("PR");

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  // 로컬 스토리지에서 userid가져오기
  const uid = localStorage.getItem("userid");
  const userid = JSON.parse(uid);

  // 이용내역 데이터
  let [data, setData] = useState(null);

  // 로그인한 유저의 데이터 가져오기
  const getData = async () => {
    const res = await axios.get(
      `http://localhost:8080/request?userid=${userid}`
    );
    data = res.data.data;
    setData(data);
  };

  // 이용내역 페이지 이동시 데이터 가져오기
  useEffect(() => {
    getData();
  }, [selectedTab]);

  console.log("Request Data", data);

  const filteredData = data
    ? data.filter((item) => item.state === selectedTab)
    : [];

  return (
    <div className="Content">
      <h1>이용내역</h1>
      <Tabs onSelectTab={handleTabSelect} />
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((item) => (
          <Container key={item.id}>
            <p>{item.content}</p>
            <GapItems>
              <Badge>
                <LocationOnRoundedIcon fontSize="small" />
                {item.sido} {item.sigungu}
              </Badge>
              <Badge>
                <PersonRoundedIcon fontSize="small" />
                {item.gender}
              </Badge>
              <Badge>
                <CreditCardRoundedIcon fontSize="small" />
                {item.price}
              </Badge>
            </GapItems>
            <Span>{formatDate(item.createdAt)}</Span>
          </Container>
        ))
      ) : (
        <Container> 이용 내역이 없습니다.</Container>
      )}
    </div>
  );
}
