import useAuthData from '../../hooks/useAuthData';
import Header from '../../components/Header'
import { MdAccountCircle, MdClose, MdFilterNone } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { selectToken } from '../auth/authSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetUserByUsernameQuery } from './usersApiSlice';
import { useEffect, useRef, useState } from 'react';
import LoadingSreen from '../../screens/loading/LoadingScreen';
import ErrorScreen from '../../screens/error/ErrorScreen';
import FollowButton from './FollowButton';
import BottomNavigation from '../../components/BottomNavigation';
import { useGetUserPostsByUsernameQuery } from '../post/postsApiSlice';
import Main from '../../components/Main'
import ProfilePicCircle from '../../components/ProfilePicCircle';
const ProfilePage = () => {
  const [showPic, setShowPic] = useState(false);
  const postsRef = useRef();
  const {username:myUsername} = useAuthData();
  const { username } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading, isSuccess, isError, error } = useGetUserByUsernameQuery(username);
  const { data: posts, isLoading: isLoadingPosts, isSuccess: isSuccessPosts } = useGetUserPostsByUsernameQuery(username);

  if (isLoading || isLoadingPosts) return <LoadingSreen />
  if (isError) return <ErrorScreen error={error} />
  if (isSuccess && isSuccessPosts) return (
    <>
      <Header title={"Profile"} />
      <Main className={'px-4 md:p-8'}>
       <section className='flex flex-col items-center'>
       {
          user?.profilePic ? <div onClick={() => { setShowPic(true) }} className='w-32 h-32 border-2 rounded-full my-4 bg-light dark:bg-dark-sec bg-cover bg-no-repeat' style={{backgroundImage:`url(https://res.cloudinary.com/dofd4iarg/image/upload/v1671877960/${user?.profilePic}.png)`}} alt=""></div> : <p><MdAccountCircle className='text-slate-300 text-8xl' /></p>
        }
         {
          user?.profilePic && showPic && (
            <section className='w-screen h-screen absolute flex items-center top-0 bg-[rgba(0,0,0,0.75)] z-10 md:hidden'>
              <button onClick={() => { setShowPic(false) }} className='absolute top-4 right-6 bg-gray-200 dark:bg-dark-sec p-2 rounded-full'>
                <MdClose />
              </button>
              <ProfilePicCircle src={user?.profilePic} className='w-full rounded-none sm:w-20 sm:h-20 dark:bg-dark-sec pt-[100%]' />
            </section>
          )
        }
         <section className='text-center space-y-2'>
          <p className='text-2xl'>{user?.name}</p>
          <p className='text-green-500 dark:text-green-300 bg-light dark:bg-dark-sec w-fit flex items-center gap-1 mx-auto px-3 py-1 rounded-full'>{'@' + user?.username}</p>
        </section>
       </section>

        <ul className='flex p-2 md:p-4 w-full gap-2 my-4'>
          <li className='w-full'>
            <button onClick={() => { postsRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className='flex flex-col gap-1 shadow-md rounded-lg p-4 items-center dark:bg-dark-sec w-full'>
              <p className='text-3xl'>{posts?.length}</p>
              <p className='text-xs'>Posts</p>
            </button>
          </li>
          <li className='w-full'>
            <Link to={'followers'} className='flex flex-col gap-1 shadow-md rounded-lg p-4 items-center dark:bg-dark-sec'>
              <p className='text-3xl'>{user?.followers?.length}</p>
              <p className='text-xs'>Followers</p>
            </Link>
          </li>
          <li className='w-full'>
            <Link to={'following'} className='flex flex-col gap-1 shadow-md  rounded-lg p-4 items-center dark:bg-dark-sec'>
              <p className='text-3xl'>{user?.following?.length}</p>
              <p className='text-xs'>Following</p>
            </Link>
          </li>
        </ul>

        <section className='grid gap-2 grid-cols-2 w-full md:px-4'>
          <FollowButton username={username} />
          <button className='border-sky-500 border-2 text-sky-500 px-4 py-2 rounded-lg'>
            <Link to={`/chat/${username}`}>Message</Link>
          </button>
        </section>
        <hr className='my-4' />
        {
          posts?.length ? <article ref={postsRef} className='min-h-screen  w-full'>
            <ul className='grid grid-cols-3 gap-1 '>
              {
                posts?.map(post => <li key={post._id} className={`relative bg-no-repeat bg-cover  aspect-square rounded-md dark:bg-dark-sec`} style={{backgroundImage:`url(https://res.cloudinary.com/dofd4iarg/image/upload/v1671877960/${post.media[0]?.public_id}.${post.media[0]?.extension})`}}>
                  {
                    post?.media?.length > 1 && <MdFilterNone className='absolute top-1 right-1 text-white bg-[rgba(0,0,0,0.2)] rounded-md box-content p-1 m-1' />
                  }
                </li>
                )
              }
            </ul>
          </article> :
            <article className=' h-[30vh] w-full grid place-content-center gap-2 text-center'>
            <p className='text-4xl'>🍃</p>
            <p>No Posts</p>
          </article>
        }
     </Main>
      <BottomNavigation />

    </>
  )
}
export default ProfilePage