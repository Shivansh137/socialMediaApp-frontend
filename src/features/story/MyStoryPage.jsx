import { Link, useNavigate } from "react-router-dom";
import useAuthData from "../../hooks/useAuthData"
import { useGetUserStoriesByUsernameQuery } from "./storyApiSlice"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectMyStories } from "./storySlice";
import { useGetProfilePicQuery } from "../user/usersApiSlice";
import LoadingSreen from "../../screens/loading/LoadingScreen";
import { MdClose } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";

// components
const Reaction = ({ emoji, count = 0 }) => {
  return <li className='flex items-center dark:bg-[rgba(0,0,0,0.5)] px-2 py-1 rounded-full gap-1 w-fit aspect-square text-xl'>
    <p>{emoji}</p>
  </li>
}


const MyStoryPage = () => {
  const { username } = useAuthData();
  const stories = useSelector(selectMyStories);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { data: profilePic, isLoading, isSuccess } = useGetProfilePicQuery(username);

  // handling left and right clicks
  const handleImgClick = (e) => {
    const center = window.screen.width / 2;
    const x = e?.clientX;
    if (x < center && index > 0) setIndex(i => i - 1)
    if (x > center) {
      if (index + 1 < stories?.length) setIndex(i => i + 1);
      else navigate('/');
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      if (index + 1 < stories?.length) setIndex(i => i + 1);
      else navigate('/')
    }, 8000);
    return () => clearInterval(interval)
  })

  if (isLoading) return <LoadingSreen />
  return (
    <>
      <div className="w-screen h-screen dark:bg-dark absolute top-0 left-0 md:flex items-center justify-center overflow-hidden">
        {
          <section className={`h-screen w-screen md:w-[25vw] md:h-[95vh] relative top-0 left-0 inline-block`} style={{ backgroundImage: `url(https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${stories[index].media?.public_id}.png)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} onClick={handleImgClick}>

            <section className="flex gap-2">
              {
                stories?.map((_, i) => <div key={i} className="h-1 bg-gray-500 w-full">
                  <div className={`h-full ${index >= i ? 'bg-white' : ''} ${index === i ? 'storyTimer' : ''}`}></div>
                </div>
                )
              }
            </section>

            <section className="px-2 py-2 flex items-center gap-2">
              <Link to={'/stories/add_story'} className="relative rounded-full">
                <BsPlusCircleFill className="absolute bottom-0 right-0 text-blue-500 bg-white rounded-full" />
                {
                  profilePic ?
                    <img className='w-10 h-10 rounded-full p-2 bg-white dark:bg-dark-sec' src={`https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${profilePic}.png`} alt="" /> : <p><MdAccountCircle className='text-slate-300 text-4xl' /></p>
                }
              </Link>
              <p>{username}</p>
              <p>{
              parseInt((new Date() - new Date(stories[index]?.createdAt)) / (1000*60*60)) > 0 ?
              parseInt((new Date() - new Date(stories[index]?.createdAt)) / (1000*60*60)) + 'h' :
              parseInt((new Date() - new Date(stories[index]?.createdAt)) / (1000*60)) + 'm'
              }</p>
              <MdClose className="ml-auto cursor-pointer" size={25} onClick={() => { navigate('/') }} />
            </section>

          </section>
        }
      </div>
    </>
  )

}
export default MyStoryPage