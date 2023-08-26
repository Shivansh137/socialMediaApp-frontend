import { MdAccountCircle } from "react-icons/md"
import { Link } from "react-router-dom"
import FollowButton from "./FollowButton"
import ProfilePicCircle from '../../components/ProfilePicCircle'
import useAuthData from "../../hooks/useAuthData"

const UserList = ({ users, type }) => {
  const {username} = useAuthData();
  return (
    <ul className={`w-full grid grid-cols-1 ${type === 'list' ? '' : 'md:grid-cols-3'} gap-3 md:gap-4 p-2 dark:bg-dark dark:text-white`}>
      {
        users?.map(user => {
          return (
            <li key={user?.username}>
              <Link to={`/${user?.username === username ? 'profile' : user?.username}`} className={`flex ${type === 'list' ? '' : 'md:flex-col'} items-center px-4 py-5 md:p-4 gap-3 md:gap-4 border-2 dark:border-dark shadow-sm dark:bg-dark-sec rounded-xl md:hover:scale-105`}>
                {
                  <ProfilePicCircle src={user?.profilePic} className={`w-10 h-10 ${type === 'list' ? '' : ' md:w-24 md:h-24'}`} />
                }
                  <div className={`${type==='list'?'':'md:text-center'}`}>
                  <p>{user?.name}</p>
                  <p className="text-sm text-gray-800 dark:text-gray-300">{user?.username}</p>
                </div>
               {
                user?.username !== username ?  <FollowButton username={user?.username} classname={`text-sm ml-auto w-[25%] ${type==='list'?'':'md:w-full'} py-3 md:py-2`} /> : <p className={`px-4 py-4 ${type==='list'? 'w-[25%] ml-auto text-xs' : 'md:w-full'}`}></p>
               }
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}
export default UserList