import Container from "../components/common/Container";
import Badge from "../components/common/Badge";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Span, P } from "../components/common/Text";
import Tabs from "../components/common/Tabs";
import { useEffect, useState } from "react";
import formatDateTime from "../utils/formatDateTime";
import api from "../api";
import GapItems from "../components/common/GapItems";
import { Link, useNavigate } from "react-router-dom";

export default function TradeList() {
  const [selectedTab, setSelectedTab] = useState("PR");
  const [trade, setTrade] = useState([]);
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

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

  const getTrade = async () => {
    const query = usertype === "B" ? `busterid=${userid}` : `userid=${userid}`;

    try {
      const res = await api.get(`/trade?${query}`);
      if (res.data.success) {
        const data = res.data.data;
        const filteredData = data
          .filter((item) => item.state === "CP")
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setTrade(filteredData);
      } else {
        console.log("Error getting trade");
      }
    } catch (err) {
      console.log("Error getting trade", err);
    }
  };

  useEffect(() => {
    if (usertype === "B") {
      getChatList();
    } else getReqData();
  }, [selectedTab]);

  useEffect(() => {
    selectedTab === "CP" && getTrade();
  }, [selectedTab]);
  console.log(trade);

  const filteredData = data ? data.filter((item) => item.state === selectedTab) : [];

  return (
    <>
      {token ? (
        <div className="Wrapper">
          <div className="Content">
            <h1>이용내역</h1>
            <GapItems $col $left $gap="1rem">
              <Tabs onSelectTab={handleTabSelect} />
              {filteredData && filteredData.length > 0 ? (
                <GapItems $col $gap="1rem">
                  {filteredData.map((item, idx) => (
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
                        {selectedTab === "CP" && (
                          <GapItems $col $left $gap="0.5rem">
                            <GapItems>
                              <P $textColor="darkgreen">
                                <CheckRoundedIcon fontSize="small"/>
                              </P>
                              <p>버스터 아이디: {trade[idx]?.busterid}</p>
                            </GapItems>
                            <GapItems>
                              <P $textColor="darkgreen">
                                <CheckRoundedIcon fontSize="small"/>
                              </P>
                              <p>최종 금액: {trade[idx]?.finalprice.toLocaleString()}원</p>
                            </GapItems>
                          </GapItems>
                        )}
                        <Span>
                          {formatDateTime(item.createdAt)} | 작성자: {item.userid}
                        </Span>
                      </Container>
                    </Link>
                  ))}
                </GapItems>
              ) : (
                <Container>이용 내역이 없습니다.</Container>
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
