import { Link } from "react-router-dom"
import { useGetProfilePicQuery } from "../user/usersApiSlice"
import { MdAccountCircle } from "react-icons/md";
import LoadingSreen from "../../screens/loading/LoadingScreen";

const StoryCircle = ({ username, index }) => {
    const { data: profilePic, isLoading, isSuccess } = useGetProfilePicQuery(username);
    return (
        <li className="rounded-lg inline-block">
            <Link to={`/stories/${index}`} className="rounded-lg sm:px-4 flex flex-col gap-2 sm:gap-3 items-center ">
            <section className={`relative ${!localStorage.seenStoriesUsernames?.includes(username) ? 'bg-gradient-to-br from-pink-500 via-violet-500 to-blue-500' : 'bg-gray-500'} rounded-full p-0.5`}>

                {
                    profilePic ? <img className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-dark-sec' src={`https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${profilePic}.png`} alt="" /> : <p><MdAccountCircle className='text-slate-300 text-6xl' /></p>
                }
                </section>
                <p className="text-xs truncate w-16">{username}</p>
            </Link>
        </li>
    )
}
export default StoryCircle