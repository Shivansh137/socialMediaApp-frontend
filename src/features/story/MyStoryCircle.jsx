import { Link } from "react-router-dom"
import { useGetProfilePicQuery } from "../user/usersApiSlice"
import { MdAccountCircle } from "react-icons/md";
import LoadingSreen from "../../screens/loading/LoadingScreen";
import useAuthData from "../../hooks/useAuthData";
import {BsPlusCircleFill} from 'react-icons/bs'
import { useSelector } from "react-redux";
import { selectMyStories } from "./storySlice";
import ProfilePicCircle from '../../components/ProfilePicCircle'

const MyStoryCircle = () => {
    const {username} = useAuthData();
    const { data: profilePic} = useGetProfilePicQuery(username);
    const mystories = useSelector(selectMyStories);
     return (
        <li className={`${mystories?.length ? 'bg-gradient-to-br from-pink-500 via-yellow-500 to-sky-500' : 'dark:bg-gray-700'} inline-block p-[1px] rounded-lg md:hidden`}>
            <Link to={`/stories/${mystories?.length ? 'mystories' : 'add_story'}`} className="rounded-lg p-2 sm:px-3 sm:gap-3 bg-light dark:bg-dark flex flex-col gap-2 items-center relative">
              <section className="relative">
                <ProfilePicCircle src={profilePic} className='w-16 sm:w-20 sm:h-20 dark:bg-dark-sec h-16' />
                {
                mystories?.length ? '' : <BsPlusCircleFill className="absolute bottom-0 right-0 text-blue-600 bg-white rounded-full" /> 
               }
              
              </section>
                <p className="text-xs truncate w-16 text-center">{'Your Story'}</p>
            </Link>
        </li>
    )
}
export default MyStoryCircle