export default function formatDate(date) {
  const today = new Date();

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = today.getDate().toString().padStart(2, "0");

  return (`${year}년 ${month}월 ${day}일`);
}
