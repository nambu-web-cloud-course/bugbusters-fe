import Container from "../components/atom/Container";
import Text from "../components/atom/Text";
import Input from "../components/atom/Input";
import Label from "../components/atom/Label";
import Button from "../components/atom/Button";
import Tabs from "../components/molecule/Tabs";
import Tab from "../components/atom/Tab";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';

export default function TradeList() {
  return (
    <div className="Content">
      <h1>이용내역</h1>
      
      <Tabs />
      <Container></Container>
    </div>
  );
}
