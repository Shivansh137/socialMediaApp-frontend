import { Link } from "react-router-dom"
import { useGetUserByUsernameQuery } from '../user/usersApiSlice'
import ProfilePicCircle from '../../components/ProfilePicCircle'
import { useSelector } from "react-redux";
import { selectOnlineUsers, selectUnreadedMessages } from "./chatSlice";

const ChatList = ({ username }) => {
  const { data: user } = useGetUserByUsernameQuery(username);
  const messages = useSelector(selectUnreadedMessages);
  const onlineUsers = useSelector(selectOnlineUsers);

  return (
    <li key={user?._id}>
      <Link to={`/chat/${user?.username}`} className=" flex p-4 items-center gap-4 shadow-sm  dark:bg-dark-sec rounded-lg">
        <div className="relative rounded-full bg-light dark:bg-dark">
          <div style={{ display: onlineUsers.includes(user?.username) ? 'block' : 'none' }}>
            <span className="absolute bg-green-500 rounded-full p-1 bottom-0.5 right-0.5"></span>
            <span className="absolute animate-ping bg-green-500 rounded-full p-1 bottom-0.5 right-0.5"></span>
          </div>
          <ProfilePicCircle className='w-10 h-10 text-4xl' src={user?.profilePic} />
        </div>
        <div>
          <p className="text-sm">{user?.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.username}</p>
        </div>
        {
          messages?.some(msg => msg.sender === username) &&
          <span className="w-3 h-3 rounded-full bg-primary text-black self-center ml-auto mr-4 p-3 grid place-content-center">
            {messages?.filter(msg => msg.sender === username).length}
          </span>
        }
      </Link>
    </li>
  )
}
export default ChatList