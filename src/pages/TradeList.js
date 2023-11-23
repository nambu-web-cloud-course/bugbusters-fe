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
import { Link, useNavigate } from "react-router-dom";

export default function TradeList() {
  const [selectedTab, setSelectedTab] = useState("PR");
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const token = JSON.parse(localStorage.getItem("token"));

  const navigate = useNavigate();
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
      } else {
        console.log("Error getting user request data");
      }
    } catch (err) {
      console.log("Error getting user request data", err);
    }
  };

  // 버스터가 채팅을 건 요청 데이터 가져오기
  const getChatList = async () => {
    try {
      const res = await api.get(`/chat?busterid=${userid}`);
      if (res.data.success) {
        const chatList = res.data.data;
        const reqData = await Promise.all(
          chatList.map(async (chat) => {
            const res = await api.get(`/request/${chat.reqid}`);
            return res.data.success ? res.data.data : null;
          })
        );

        const sortedData = reqData
          .filter((data) => data !== null)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setData(sortedData);
      } else {
        console.log("Error getting chat list");
      }
    } catch (err) {
      console.log("Error getting chat list", err);
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
    <>
      {token ? (
        <div className="Content">
          <h1>이용내역</h1>
          <GapItems $col $left $gap="1rem">
          <Tabs onSelectTab={handleTabSelect} />
          {filteredData && filteredData.length > 0 ? (
            <GapItems $col $gap="1rem">
              {filteredData.map((item) => (
                <Link to={`/request/${item.id}`} key={item.id}>
                  <Container>
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
                    {usertype === "C" ? (
                      <Span>{formatDateTime(item.createdAt)}</Span>
                    ) : (
                      <Span>
                        {formatDateTime(item.createdAt)} 😨 작성자:{" "}
                        {item.userid}
                      </Span>
                    )}
                  </Container>
                </Link>
              ))}
            </GapItems>
          ) 
          : 
          (
            <Container>이용 내역이 없습니다.</Container>
          )}
          </GapItems>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
