import { Link } from "react-router-dom"
import { useGetProfilePicQuery } from "../user/usersApiSlice"
import { MdAccountCircle } from "react-icons/md";
import LoadingSreen from "../../screens/loading/LoadingScreen";

const StoryCircle = ({ username, index }) => {
    const { data: profilePic, isLoading, isSuccess } = useGetProfilePicQuery(username);
    return (
        <li className=" bg-gray-700 rounded-lg p-[1px] inline-block">
            <Link to={`/stories/${index}`} className="rounded-lg p-2 sm:px-4 bg-slate-100 dark:bg-dark flex flex-col gap-2 sm:gap-3 items-center ">
                {
                    profilePic ? <img className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-dark-sec' src={`https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${profilePic}.png`} alt="" /> : <p><MdAccountCircle className='text-slate-300 text-6xl' /></p>
                }
                <p className="text-xs truncate w-16">{username}</p>
            </Link>
        </li>
    )
}
export default StoryCircle