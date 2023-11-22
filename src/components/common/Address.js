import { useDaumPostcodePopup } from "react-daum-postcode";
import Button from "./Button";

export default function Address({ setAddress }) {
  const scriptUrl =
    "https://t2.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    setAddress(data);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Button
      $color="green"
      $size="lg"
      $width="20%"
      type="button"
      onClick={handleClick}
    >
      검색
    </Button>
  );
}
