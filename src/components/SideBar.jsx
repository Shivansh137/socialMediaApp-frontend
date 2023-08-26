import { useRef, useState } from "react"
import { MdAccountCircle, MdClose, MdCode, MdEdit, MdLock, MdPrivacyTip, MdSunny } from "react-icons/md";
import useAuthData from "../hooks/useAuthData";
import { useGetProfilePicQuery } from "../features/user/usersApiSlice";
import ProfilePicCircle from "../components/ProfilePicCircle";
import { Link } from "react-router-dom";
import { BsGithub, BsInstagram, BsLinkedin, BsMoonFill } from "react-icons/bs";

const SideBar = ({show:[showSideBar, setShowSideBar]}) => {
  const ref = useRef(null);
  const [render, setRender] = useState(false); // just to re render the component
  const {username} = useAuthData();
  const {data:profilePic} = useGetProfilePicQuery(username)
  const changeTheme = () =>{
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
 if(showSideBar) return (
    <aside ref={ref} className="show_sidebar overflow-y-scroll absolute top-0 left-0 z-20 bg-white dark:bg-dark w-screen md:w-[20vw] h-screen flex flex-col">
        <section className="p-4 shadow-sm flex items-center ">
            <p className="text-xl">SocialMediaApp</p>
            <button onClick={()=>{setShowSideBar(false)}} className="ml-auto"><MdClose size={25} /></button>
        </section>
      
      <section className="px-4 py-6 flex flex-col items-center gap-4 bg-dark-sec">
        <ProfilePicCircle src={profilePic} className='w-28 h-28 text-8xl' />
        <p className="text-3xl font-[Cookie] text_gradient rounded-full px-4">{username}</p>
      </section>


        <section className="flex flex-col gap-6 px-4 grow">

       <details open={true} className="mt-4 dark:bg-dark-sec bg-light rounded-lg">
        <summary className="text-lg rounded-t-lg p-4">
         <span className="mx-2">Theme</span></summary>
        <div className="flex flex-col gap-4 p-4  text-lg rounded-b-lg">
        <label htmlFor="">
        <input checked={!localStorage.theme} onChange={()=>{ localStorage.removeItem('theme'); changeTheme(); setRender(e => !e)}} className="scale-[2] mx-2" type="radio" name="theme"  /> System
        </label>
        <label htmlFor="">
        <input checked={localStorage.theme === 'dark'} onChange={()=>{ localStorage.theme = 'dark'; document.documentElement.classList.add('dark'); setRender(e => !e)}} className="scale-[2] mx-2" type="radio" name="theme"  /> Dark
        </label>
        <label htmlFor="">
        <input checked={localStorage.theme === 'light'}  onChange={()=>{localStorage.theme = 'light';document.documentElement.classList.remove('dark'); setRender(e => !e)}} className="scale-[2] mx-2" type="radio" name="theme"  /> Light
        </label>
        </div>
       </details>

       <Link to='/profile/edit' className="text-xl flex items-center gap-2 p-2">
        <MdEdit size={20} />Edit Profile
        </Link>

       <Link className="text-xl flex items-center gap-2 p-2">
        <MdLock size={20} />Privacy Policy
        </Link>
  
    <details className="dark:bg-dark-sec bg-light rounded-lg">
    <summary className=" text-xl  p-4">
    <span className="mx-2">Developer</span>
    </summary>
    <ul className="flex text-2xl p-4 gap-4 justify-center">
    <a href="https://github.com/Shivansh137" target="_blank">
      <BsGithub />
    </a>
     <a href="https://www.instagram.com/shivanshagrawal137/" target="_blank">
      <BsInstagram />
     </a>
     <a href="https://www.linkedin.com/in/shivansh-agrawal-529b59255/" target="_blank">
      <BsLinkedin />
     </a>
    </ul>
    <p className="pb-4  font-mono text-center">Shivansh Agrawal</p>

   </details>
   <p className="text-center mt-auto pb-2">version 1.0.0</p>
    </section>
   
     
    
    </aside>
  )
}
export default SideBar