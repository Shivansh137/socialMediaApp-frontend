import { MdArrowBack } from "react-icons/md"
import ProfilePicCircle from '../../components/ProfilePicCircle'
import { Link, useNavigate } from "react-router-dom";

const ChatHeader = ({ name,username, src }) => {
  const navigate = useNavigate();
  return (
    <header className="p-4 flex items-center gap-4 sticky top-0 dark:bg-dark shadow-sm dark:text-white">
      <MdArrowBack className="md:hidden" onClick={() => { navigate(-1) }} size={25} />
     <Link className="flex items-center gap-2" to={`/${username}`}>
     <ProfilePicCircle className={'w-8 h-8 dark:bg-dark-sec bg-light'} src={src} />
      <p className="text-lg">{name}</p>
      </Link>
    </header>
  )
}
export default ChatHeader