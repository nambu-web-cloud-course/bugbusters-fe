export default function getUserInfo(info) {
  const data = localStorage.getItem(info);
  return data ? JSON.parse(data) : null;
}