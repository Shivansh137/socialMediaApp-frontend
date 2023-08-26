import { BiMenu, BiSearch } from "react-icons/bi"
import { BsBellFill } from "react-icons/bs"
import { GoHomeFill } from "react-icons/go"
import { MdAccountCircle, MdChat } from "react-icons/md"
import { Link } from "react-router-dom"
import SideBar from './SideBar'
import { useState } from "react"

const List = ({ title, icon, to }) => {

    return <li className=" rounded-md w-full overflow-hidden">
        <Link to={to} className="flex items-center gap-4 text-xl p-4">
            <p className="text-2xl">{icon}</p>
            {title}
        </Link>
    </li>
}
const Aside = () => {
    const [showSideBar, setShowSideBar] = useState(false)
    return (
        <aside className="hidden w-[20vw] bg-light dark:bg-dark-sec md:flex flex-col p-4 relative">
            <SideBar show={[showSideBar, setShowSideBar]} />
            <p className="text-4xl p-4 text_gradient font-[Cookie]">SocialMediaApp</p>
            <ul className="px-2 py-4 flex flex-col gap-4 items-center">
                <List icon={<GoHomeFill />} title={'Home'} to={'/'} />
                <List icon={<BiSearch />} title={'Search'} to={'/search'} />
                <List icon={<MdChat />} title={'Chat'} to={'/chat'} />
                <List icon={<BsBellFill />} title={'Notifications'} to={'/notifications'} />
                <List icon={<MdAccountCircle />} title={'Profile'} to={'/profile'} />
            </ul>
            <button className="flex items-center text-xl gap-2 mt-auto px-4 py-2" onClick={() => { setShowSideBar(true) }}>
                <BiMenu size={30} /> More
            </button>
        </aside>
    )
}
export default Aside