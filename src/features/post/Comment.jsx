import { MdAccountCircle } from "react-icons/md";
import ProfilePicCircle from "../../components/ProfilePicCircle"
import useAuthData from "../../hooks/useAuthData"
import { useGetProfilePicQuery } from '../user/usersApiSlice'

const Comment = ({ comment }) => {
  const { username, profilePic } = useAuthData();
  const {data} = useGetProfilePicQuery(comment?.username);

  return (
    <li className={`flex gap-2 px-2 ${comment?.username === username ? 'flex-row-reverse' : ''}`}>
      {
        data ? <ProfilePicCircle className='w-8 h-8 text-xl mr-2' src={`${comment?.username === username ? profilePic : data}`} />
        : <MdAccountCircle className={`text-slate-300 w-8 h-8`} />
      }
      <section className={`shadow-md dark:bg-dark-sec p-3 rounded-lg`}>
        <p className="text-[deeppink] pb-1 text-xs font-semibold">{comment?.username === username ? 'You' : comment?.username}</p>
        <p className="text-sm">{comment?.message}</p>
      </section>
    </li>
  )
}
export default Comment