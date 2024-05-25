import { useState } from "react"
import BottomNavigation from "../components/BottomNavigation"
import Main from "../components/Main"
import PostList from "../features/post/PostList"
import StoriesContainer from "../features/story/StoriesContainer"
import SideBar from "../components/SideBar"
import { Link } from "react-router-dom"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { selectAllNotifications } from "../features/notification/notificationsSlice"
import { useGetAllUsersQuery } from "../features/user/usersApiSlice"
import UserList from '../features/user/UserList'
import { MdMenu } from "react-icons/md"
import Logo from "../components/Logo"
import ErrorScreen from "../screens/ErrorScreen"

const HomePage = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const notifications = useSelector(selectAllNotifications);
  const { data: users, isError, error } = useGetAllUsersQuery();

  return (
    <>
     { isError ? <ErrorScreen error={error} /> : ''}
      <SideBar show={[showSideBar, setShowSideBar]} />

      <header className="p-4 flex items-center dark:bg-dark-sec gap-2 md:hidden sm:text-xl">
        <button onClick={() => { setShowSideBar(true) }}><MdMenu size={20} /></button>
        <Logo />
        <Link className="ml-auto relative" to={'/notifications'}>
          {
            notifications?.length ? <BsHeartFill color="red" size={20} /> : <BsHeart size={20} />
          }
        </Link>
      </header>

      <Main className={'w-full'}>
        <StoriesContainer />
        <PostList />
      </Main>
      <section className="hidden w-full max-w-lg md:block px-4 py-4 overflow-y-scroll">
        <p className="px-4 py-4 dark:text-gray-300">Suggestions for you</p>
        <UserList type={'list'} users={users} />
      </section>
      <BottomNavigation />
    </>
  )
}
export default HomePage