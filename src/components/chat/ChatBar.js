import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const ChatBar = ({socket}) => {
// Active users 있는 부분
const [roomUsers, setRoomUsers] = useState([]);
const navigate = useNavigate();
let chatData = {};

useEffect(() => {
  socket.on("join_room", data => {
    const {userid, room, rid, req_userid} = data
    chatData = {userid, room, rid, req_userid};
  })

  socket.on('chatroom_users', (data) => {
    console.log(data);
    setRoomUsers(data);
  });

  return () => socket.off('chatroom_users');
}, [socket]);

const leaveRoom = () => {
  const createdAt = Date.now();
  
  // socket.emit('leave_room', { chatData.userid, chatData.room, chatData.createdAt });
  // Redirect to home page
  navigate('/chat');
};

  const [users, setUsers] = useState([])

    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

  return (
    <div className='chat__sidebar'>
        <h2>채팅창</h2>
        <div>
            <h4 className='chat__header'>ACTIVE USERS</h4>
            <div className='chat__users'>
                {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
            </div>
        </div>
  </div>
  )
}

export default ChatBar