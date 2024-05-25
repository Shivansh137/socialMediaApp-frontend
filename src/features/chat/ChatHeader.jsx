import { MdArrowBack } from "react-icons/md"
import ProfilePicCircle from '../../components/ProfilePicCircle'
import { Link, useNavigate } from "react-router-dom";

const ChatHeader = ({ name, username, src, isOnline }) => {
  const navigate = useNavigate();
  return (
    <header className="p-4 flex items-center gap-2 sticky top-0 dark:bg-dark shadow-sm dark:text-white">
      <MdArrowBack className="md:hidden" onClick={() => { navigate(-1) }} size={25} />
      <Link className="flex  gap-2" to={`/${username}`}>
        <ProfilePicCircle className={'w-10 h-10 dark:bg-dark-sec bg-light'} src={src} />
        <div className="self-center mx-2 text-lg">
          <p>{name}</p>
          <p style={{ display: `${isOnline ? "block" : "none"}` }} className="text-xs">
            {
              isOnline ?  "Online" : ""
            }
          </p>
        </div>
      </Link>
    </header>
  )
}
export default ChatHeader