import Container from "../components/common/Container";
import Badge from "../components/common/Badge";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { Span } from "../components/common/Text";
import Tabs from "../components/common/Tabs";
import { useEffect, useState } from "react";
import formatDateTime from "../utils/formatDateTime";
import api from "../api";
import GapItems from "../components/common/GapItems";

export default function TradeList() {
  const [selectedTab, setSelectedTab] = useState("PR");
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  const [data, setData] = useState([]);

   // 무서버의 요청 데이터 가져오기
   const getReqData = async () => {
    try {
      const res = await api.get(`/request?userid=${userid}`);
      if (res.data.success) {
        const data = res.data.data;
        setData(data);
      }
    } catch (err) {
      console.log("Request Data Get Error", err);
    }
  };

  // 버스터가 채팅을 건 요청 데이터 가져오기
  const getChatList = async () => {
    try {
      const res = await api.get(`/chat?busterid=${userid}`);
      if (res.data.success) {
        const chatList = res.data.data;
        const reqList = chatList.map(async (chat) => {
          const res = await api.get(`/request/${chat.reqid}`);
          if (res.data.success) {
            return res.data.data;
          }
          return null;
        });

        const reqData = await Promise.all(reqList);
        const validReqData = reqData.filter((data) => data !== null);

        setData(validReqData);
      }
    } catch (err) {
      console.log("Chat List Get Error", err);
    }
  };

  useEffect(() => {
    if (usertype === "B") {
      getChatList();
    } else getReqData();
  }, [selectedTab]);

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
            {usertype === "C" ? (
              <Span>{formatDateTime(item.createdAt)}</Span>
            ) : (
              <Span>
                {formatDateTime(item.createdAt)} 😨 작성자: {item.userid}
              </Span>
            )}
          </Container>
        ))
      ) : (
        <Container>이용 내역이 없습니다.</Container>
      )}
    </div>
  );
}
