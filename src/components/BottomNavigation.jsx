import { MdAccountCircle, MdAddBox, MdChat } from "react-icons/md"
import { BiSearch } from "react-icons/bi"
import { GoHomeFill } from 'react-icons/go'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUnreadedMessages } from "../features/chat/chatSlice"

const BottomNavigation = () => {
    const messages = useSelector(selectUnreadedMessages);

    return (
        <footer className="py-4 text-4xl sm:text-4xl dark:bg-dark text-gray-800 dark:text-white md:hidden">
            <ul className="flex items-center justify-around">
                <li> <Link to={'/'}> <GoHomeFill /> </Link> </li>
                <li><Link to={'/search'}>   <BiSearch /> </Link>  </li>
                <li>  <Link to={'/posts/add_post'} className="text_gradient"> <MdAddBox />  </Link>  </li>
                <li>
                    <Link className="relative" to={'/chat'}>
                        {
                            messages?.length ? (<div
                                className="absolute text-xs bg-sky-600  rounded-full grid place-content-center outline-[10px] right-[-6px] top-[-6px] p-2 w-4 h-4">
                                {messages.length}
                            </div>) : ''
                        }
                        <MdChat />
                    </Link>
                </li>
                <li> <Link to={'/profile'}> <MdAccountCircle className="text-gray-500 dark:text-white" /> </Link> </li>
            </ul>
        </footer>
    )
}
export default BottomNavigation