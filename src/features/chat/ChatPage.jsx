import BottomNavigation from "../../components/BottomNavigation"
import Header from "../../components/Header"
import ChatList from "./ChatList"
import { useGetChatUsersQuery } from "./chatApiSlice"
import LoadingSreen from '../../screens/LoadingScreen'
import ErrorScreen from '../../screens/ErrorScreen'
import useAuthData from "../../hooks/useAuthData"
import Main from '../../components/Main'
import { MdAddBox, MdChatBubble } from "react-icons/md"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const ChatPage = () => {
  
  const {username} = useAuthData();
  const {data:usernames, isFetching, isSuccess, isError, error, refetch} = useGetChatUsersQuery(username);
  const {username:user} = useParams();

  useEffect(()=>{
    refetch();
  },[])

  if(isError) return <ErrorScreen error={error} />
 return (
    <>
    <Header title={"Chats"} />
    <Main className={'relative min-h-screen'}>
   {
     isFetching && <LoadingSreen/>
   }
   {
isSuccess &&
<>
<p className="px-4 py-4 border-b-2 border-gray-500 box-content m-2 text-lg hidden md:block">Chats</p>
  {
    usernames?.length ?
     <ul className="w-full flex flex-col gap-3 p-3 ">
     {
       
       usernames.map(username => <ChatList key={username} username={username} />)       
     }
      </ul> : <article className="text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
      <MdChatBubble className="mx-auto my-4" size={40} />
      <p>Chats will appear here</p>
    </article>
  }
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