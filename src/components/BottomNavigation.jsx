import { MdAccountCircle, MdAddBox, MdChat } from "react-icons/md"
import { BiSearch } from "react-icons/bi"
import { GoHomeFill } from 'react-icons/go'
import { BsChat } from "react-icons/bs";
import { IoPaperPlane ,IoChatbubblesOutline, IoChatbubbles} from "react-icons/io5";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUnreadedMessages } from "../features/chat/chatSlice"

const BottomNavigation = () => {
    const messages = useSelector(selectUnreadedMessages);

    return (
        <section className="py-4 text-3xl sm:text-4xl dark:bg-dark-sec bg-light text-gray-800 dark:text-white md:hidden">
            <ul className="flex items-center justify-around">
                <li> <Link to={'/'}> <GoHomeFill /> </Link> </li>
                <li><Link to={'/search'}>   <BiSearch /> </Link>  </li>
                <li>  <Link to={'/posts/add_post'} className="text_gradient"> <MdAddBox />  </Link>  </li>
                <li>
                    <Link className="relative" to={'/chat'}>
                        {
                            messages?.length ? (<div
                                className="absolute text-xs bg-red-600 ring-2 ring-light dark:ring-dark-sec  rounded-full grid place-content-center outline-[10px] right-0 top-0  w-2 h-2 p-1.5">
                            </div>) : ''
                        }
                        <IoChatbubbles  />
                    </Link>
                </li>
                <li> <Link to={'/profile'}> <MdAccountCircle className="text-gray-500 dark:text-white" /> </Link> </li>
            </ul>
        </section>
    )
}
export default BottomNavigation