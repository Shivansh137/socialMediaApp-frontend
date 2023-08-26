import { useState } from "react"
import BottomNavigation from "../../components/BottomNavigation"
import Main from "../../components/Main"
import Aside from '../../components/Aside'
import PostList from "../../features/post/PostList"
import StoriesContainer from "../../features/story/StoriesContainer"
import SideBar from "../../components/SideBar"
import { Link } from "react-router-dom"
import { BiMenu } from "react-icons/bi"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { selectAllNotifications } from "../../features/notification/notificationsSlice"
import useAuthData from "../../hooks/useAuthData"
import { useGetAllUsersQuery } from "../../features/user/usersApiSlice"
import UserList from '../../features/user/UserList'

const HomePage = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const notifications = useSelector(selectAllNotifications);
  const { username } = useAuthData();
  const { data: users } = useGetAllUsersQuery();

  return (
    <>
      <SideBar show={[showSideBar, setShowSideBar]} />


      <header className="px-6 py-5 flex items-center shadow-sm border-b-2 dark:border-dark-sec gap-4 md:hidden text-lg sm:text-xl">
        <BiMenu onClick={() => { setShowSideBar(true) }} className="text-2xl sm:text-3xl " />
        <p className="">SocialMediaApp</p>
        <Link className="ml-auto relative" to={'/notifications'}>
          {
            notifications?.length ? <BsHeartFill color="red" size={25} /> : <BsHeart size={25} />
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