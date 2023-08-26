import { Link } from "react-router-dom"
import {useGetUserByUsernameQuery} from '../user/usersApiSlice'
import LoadingScreen from "../../screens/loading/LoadingScreen";
import ErrorScreen from '../../screens/error/ErrorScreen'
import ProfilePicCircle from '../../components/ProfilePicCircle'
import { useSelector } from "react-redux";
import { selectUnreadedMessages } from "./chatSlice";

const ChatList = ({username}) => {
  const {data:user} = useGetUserByUsernameQuery(username);
  const messages  = useSelector(selectUnreadedMessages);
 return (
    <li key={user?._id}>        
    <Link to={`/chat/${user?.username}`} className=" flex p-4 items-center gap-4 shadow-sm dark:border-dark border-2 dark:bg-dark-sec rounded-lg">
  <ProfilePicCircle className='w-10 h-10 text-4xl' src={user?.profilePic} />
 <div>
 <p>{user?.name}</p>
  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.username}</p>
 </div>
 {
  messages?.some(msg => msg.sender === username) &&
   <span className="w-3 h-3 rounded-full bg-sky-500 dark:bg-blue-600 text-white self-center ml-auto mr-4 p-3 grid place-content-center">
     { messages?.filter(msg => msg.sender === username).length}
   </span>
 }
  </Link>
</li>
  )
}
export default ChatList