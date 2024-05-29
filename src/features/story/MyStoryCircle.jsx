import { Link } from "react-router-dom"
import { useGetProfilePicQuery } from "../user/usersApiSlice"
import useAuthData from "../../hooks/useAuthData";
import { BsPlusCircleFill } from 'react-icons/bs'
import { useSelector } from "react-redux";
import { selectMyStories } from "./storySlice";
import ProfilePicCircle from '../../components/ProfilePicCircle'

const MyStoryCircle = () => {
  const { username } = useAuthData();
  const { data: profilePic } = useGetProfilePicQuery(username);
  const mystories = useSelector(selectMyStories);

  return (
    <li className={`inline-block p-[1px] rounded-lg md:hidden`}>
      <Link to={`/stories/${mystories?.length ? 'mystories' : 'add_story'}`} className="rounded-lg sm:px-3 sm:gap-3 flex flex-col gap-2 items-center">
        <section className={`relative ${mystories?.length ? 'ring-2 ring-primary' : 'ring-2 ring-gray-500'} rounded-full p-0.5`}>
          <ProfilePicCircle src={profilePic} className='w-16  h-16 sm:w-20 sm:h-20' />
          {
            mystories?.length ? '' : <BsPlusCircleFill className="absolute bottom-0 right-0 text-blue-600 bg-white rounded-full" />
          }
        </section>
        <p className="text-[calc(.5rem+2px)] truncate text-center">{'Your Story'}</p>
      </Link>
    </li>
  )
}
export default MyStoryCircle