import io from "socket.io-client";

const socket = io("https://api-bugbusters.azurewebsites.net");

export default socket;
