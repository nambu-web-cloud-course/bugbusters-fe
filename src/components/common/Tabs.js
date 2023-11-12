import { useState } from "react";
import { styled } from "styled-components";

const Tab = styled.div`
  display: flex;
  width: 100%;
`;

export default function Tabs({ onSelectTab }) {
  const [selectedTab, setSelectedTab] = useState("PR");

  const handleTabChange = (value) => {
    setSelectedTab(value);
    onSelectTab(value);
  };

  console.log(selectedTab);
  return (
    <div className="tabs">
      <Tab>
        <input
          value="PR"
          type="radio"
          id="PR"
          checked={selectedTab === "PR"}
          onChange={() => handleTabChange("PR")}
        />
        <label htmlFor="PR">진행중</label>
      </Tab>
      <Tab>
        <input
          value="CA"
          type="radio"
          id="CA"
          checked={selectedTab === "CA"}
          onChange={() => handleTabChange("CA")}
        />
        <label htmlFor="CA">취소</label>
      </Tab>
      <Tab>
        <input
          value="CP"
          type="radio"
          id="CP"
          checked={selectedTab === "CP"}
          onChange={() => handleTabChange("CP")}
        />
        <label htmlFor="CP">완료</label>
      </Tab>
    </div>
  );
}
