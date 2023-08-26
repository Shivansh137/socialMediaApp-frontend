import BottomNavigation from "../../components/BottomNavigation"
import Header from "../../components/Header"
import ChatList from "./ChatList"
import { useGetChatUsersQuery } from "./chatApiSlice"
import LoadingSreen from '../../screens/loading/LoadingScreen'
import ErrorScreen from '../../screens/error/ErrorScreen'
import useAuthData from "../../hooks/useAuthData"
import Main from '../../components/Main'
import { MdAddBox } from "react-icons/md"
import { useParams } from "react-router-dom"

const ChatPage = () => {
  
  const {username} = useAuthData();
  const {data:usernames, isFetching, isSuccess, isError, error, refetch} = useGetChatUsersQuery(username);
  const {username:user} = useParams();

  if(isError) return <ErrorScreen error={error} />
 return (
    <>
    <Header title={"Chats"} />
    <Main>
   {
     isFetching && <LoadingSreen/>
   }
   {
isSuccess &&
<>
<p className="px-4 py-4 border-b-2 box-content mb-2 text-lg hidden md:block">Chats</p>
   <ul className="w-full flex flex-col gap-2 p-2">
  {
    usernames.map(username => <ChatList key={username} username={username} />)
  }
   </ul>
</>
   }
   </Main>
   {
    !user && <section className="md:flex flex-col items-center justify-center grow gap-4 dark:bg-dark-sec hidden">
    <MdAddBox size={60} />
    <p>Select Chat to appear here</p>
   </section> 
   }
   <BottomNavigation/>
   </>
  )
}
export default ChatPage