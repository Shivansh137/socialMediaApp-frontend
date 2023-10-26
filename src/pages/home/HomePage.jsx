import { useState } from "react"
import BottomNavigation from "../../components/BottomNavigation"
import Main from "../../components/Main"
import PostList from "../../features/post/PostList"
import StoriesContainer from "../../features/story/StoriesContainer"
import SideBar from "../../components/SideBar"
import { Link } from "react-router-dom"
import { BiMenu } from "react-icons/bi"
import { BsHeart, BsHeartFill, BsMenuApp } from "react-icons/bs"
import { useSelector } from "react-redux"
import { selectAllNotifications } from "../../features/notification/notificationsSlice"
import useAuthData from "../../hooks/useAuthData"
import { useGetAllUsersQuery } from "../../features/user/usersApiSlice"
import UserList from '../../features/user/UserList'
import { MdMenu } from "react-icons/md"

const HomePage = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const notifications = useSelector(selectAllNotifications);
  const { username } = useAuthData();
  const { data: users } = useGetAllUsersQuery();

  return (
    <>
      <SideBar show={[showSideBar, setShowSideBar]} />


      <header className="p-4 flex items-center dark:bg-dark-sec gap-2 md:hidden sm:text-xl">
        <button onClick={()=>{setShowSideBar(true)}}><MdMenu size={20}/></button>
        <p className="px-2">SocialMediaApp</p>
        <Link className="ml-auto relative" to={'/notifications'}>
          {
            notifications?.length ? <BsHeartFill color="red" size={20}  /> : <BsHeart  size={20}/>
          }
        </Link>
      </header>
      <Main>
        <StoriesContainer />
        <PostList />
      </Main>
      <section className="hidden md:block max-w-lg px-8 py-4 overflow-y-scroll">
        <p className="px-4 py-4 dark:text-gray-300">Suggestions for you</p>
        <UserList type={'list'} users={users} />
      </section>
      <BottomNavigation />
    </>
  )
}
export default HomePage