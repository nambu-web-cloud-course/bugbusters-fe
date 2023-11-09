import { Items, GapItems } from "../atom/Items";
import Tab from "../atom/Tab";

export default function Tabs() {
  return (
    <Items>
      <Tab>진행중</Tab>
      <Tab>취소</Tab>
      <Tab>완료</Tab>
    </Items>
  );
}
