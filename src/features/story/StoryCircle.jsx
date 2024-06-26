import { Link } from "react-router-dom"
import { useGetProfilePicQuery } from "../user/usersApiSlice"
import { MdAccountCircle } from "react-icons/md";

const StoryCircle = ({ username, index }) => {
    const { data: profilePic } = useGetProfilePicQuery(username);
    return (
        <li className="rounded-lg inline-block">
            <Link to={`/stories/${index}`} className="rounded-lg sm:px-4 flex flex-col gap-2 sm:gap-3 items-center ">
                <section className={`relative ${!localStorage.seenStoriesUsernames?.includes(username) ? 'ring-2 ring-primary' : 'ring-2 ring-gray-500'} rounded-full p-0.5`}>
                    {
                        profilePic ? <img className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-dark-sec' src={`https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${profilePic}.png`} alt="" /> : <p><MdAccountCircle className='text-slate-300 text-6xl' /></p>
                    }
                </section>
                <p className="text-xs text-center truncate w-16">{username}</p>
            </Link>
        </li>
    )
}
export default StoryCircle