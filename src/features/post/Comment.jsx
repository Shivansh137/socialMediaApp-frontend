import ProfilePicCircle from "../../components/ProfilePicCircle"
import useAuthData from "../../hooks/useAuthData"
import { useGetProfilePicQuery } from '../user/usersApiSlice'

const Comment = ({ comment }) => {
  const { username, profilePic } = useAuthData();

  return (
    <li className={`flex gap-2 px-2 ${comment?.username === username ? 'flex-row-reverse' : ''}`}>
      <ProfilePicCircle className='w-8 h-8 text-xl mr-2' src={`${comment?.username === username ? profilePic : useGetProfilePicQuery(comment?.username).data}`} />
      <section className={`shadow-md dark:bg-dark-sec p-3 rounded-lg`}>
        <p className="text-[deeppink] pb-1 text-xs font-semibold">{comment?.username === username ? 'You' : comment?.username}</p>
        <p className="text-sm">{comment?.message}</p>
      </section>
    </li>
  )
}
export default Comment