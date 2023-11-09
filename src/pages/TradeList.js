import Container from "../components/atom/Container";
import Text from "../components/atom/Text";
import Button from "../components/atom/Button";
import Tabs from "../components/molecule/Tabs";
import Tab from "../components/atom/Tab";
import List from "../components/molecule/List";

export default function TradeList() {
  return (
    <div className="Content">
      <h1>이용내역</h1>
      <Tabs />
      <List/>
      {/* list 내용 서버에서 가져와서 mapping */}
    </div>
  );
}
