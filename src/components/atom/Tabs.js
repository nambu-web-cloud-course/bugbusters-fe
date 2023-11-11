export default function Tabs() {
  return (
    <div className="tabs">
      <input name="tab" value="PR" type="radio" id="PR" defaultChecked />
      <label htmlFor="PR">진행중</label>
      <input name="tab" value="CA" type="radio" id="CA" />
      <label htmlFor="CA">취소</label>
      <input name="tab" value="CP" type="radio" id="CP" />
      <label htmlFor="CP">완료</label>
    </div>
  );
}