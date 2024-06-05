import Header from '../../components/Header'
import { MdAccountCircle, MdClose, MdFilterNone } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { useGetUserByUsernameQuery } from './usersApiSlice';
import { useRef, useState } from 'react';
import LoadingSreen from '../../screens/LoadingScreen';
import ErrorScreen from '../../screens/ErrorScreen';
import FollowButton from './FollowButton';
import BottomNavigation from '../../components/BottomNavigation';
import { useGetUserPostsByUsernameQuery } from '../post/postsApiSlice';
import Main from '../../components/Main'
import ProfilePicCircle from '../../components/ProfilePicCircle';

const ProfilePage = () => {
  const [showPic, setShowPic] = useState(false);
  const postsRef = useRef();
  const { username } = useParams();
  const { data: user, isLoading, isSuccess, isError, error } = useGetUserByUsernameQuery(username);
  const { data: posts, isLoading: isLoadingPosts, isSuccess: isSuccessPosts } = useGetUserPostsByUsernameQuery(username);

  if (isError) return <ErrorScreen error={error} />
  
   if(isLoading) return <LoadingSreen />
  
  if (isSuccess && isSuccessPosts) return (
    <>
      <Header title={user?.username} />
      <Main className={'px-4 md:ml-32'}>
        <section className='flex flex-col items-center mt-4'>
          {
            user?.profilePic ? <div onClick={() => { setShowPic(true) }} className='w-24 h-24 md:w-36 md:h-36 rounded-full my-4 dark:bg-dark-sec bg-cover bg-center bg-no-repeat bg-[rgba(10,10,10,1)]' style={{ backgroundImage: `url(https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${user?.profilePic}.png)` }}></div> : <p><MdAccountCircle className='text-slate-300 text-8xl' /></p>
          }
          {
            user?.profilePic && showPic && (
              <section className='w-screen h-screen md:w-full absolute flex items-center top-0 bg-[rgba(0,0,0,0.75)] z-10 md:hidden'>
                <button onClick={() => { setShowPic(false) }} className='absolute top-4 right-2 bg-dark-sec text-white p-2 rounded-full'>
                  <MdClose />
                </button>
                <ProfilePicCircle src={user?.profilePic} className='w-full rounded-none sm:w-20 sm:h-20 dark:bg-dark-sec pt-[100%]' />

              </section>
            )
          }
        </section>
        <section className='text-center'>
          <p className='text-3xl font-[Cookie]'>{user?.name}</p>
          <p className='text-sky-500 text-xs bg-light dark:bg-dark-sec w-fit flex items-center mx-auto px-3 py-2 rounded-full'>

            {'@' + username}
          </p>
        </section>
        <ul className='flex p-2 md:p-4 w-full gap-2 my-4'>
          <li className='w-full'>
            <button onClick={() => { postsRef.current?.scrollIntoView({ behavior: 'smooth' }) }} className='flex flex-col shadow-md dark:bg-dark-sec w-full rounded-lg p-4 md:p-6 items-center'>
              <p className='text-2xl'>{posts?.length}</p>
              <p className='text-[calc(.5rem+2px)]'>Posts</p>
            </button>
          </li>
          <li className='w-full'>
            <Link to={'followers'} className='flex flex-col shadow-md dark:bg-dark-sec w-full rounded-lg p-4 md:p-6 items-center'>
              <p className='text-2xl'>{user?.followers?.length}</p>
              <p className='text-[calc(.5rem+2px)]'>Followers</p>
            </Link>
          </li>
          <li className='w-full'>
            <Link to={'following'} className='flex flex-col shadow-md dark:bg-dark-sec w-full  rounded-lg p-4 md:p-6 items-center'>
              <p className='text-2xl'>{user?.following?.length}</p>
              <p className='text-[calc(.5rem+2px)]'>Following</p>
            </Link>
          </li>
        </ul>

        <section className='flex md:px-4 gap-2 pb-4'>
          <button className='bg-sky-500/25 text-sky-500  px-4 py-2 md:py-3 text-sm rounded-md w-full'>
            <Link to={`/chat/${username}`}>Message</Link>
          </button>
          <FollowButton username={username} classname='text-sm w-full bg-gray-500/25 text-gray-500' />
        </section>

        {
          posts?.length ? <article ref={postsRef} className='min-h-screen  w-full'>
            {
              isLoadingPosts && <LoadingSreen />
            }
            <ul className='grid grid-cols-3 md:grid-cols-4 gap-1 '>
              {
                posts?.map(post => <li key={post._id} className={`relative bg-no-repeat bg-cover  aspect-square rounded-md dark:bg-dark-sec`} style={{ backgroundImage: `url(https://res.cloudinary.com/dofd4iarg/image/upload/v1671877960/${post.media[0]?.public_id}.${post.media[0]?.extension})` }}>
                  {
                    post?.media?.length > 1 && <MdFilterNone className='absolute top-1 right-1 text-white bg-[rgba(0,0,0,0.2)] rounded-md box-content p-1 m-1' />
                  }
                </li>
                )
              }
            </ul>
          </article> :
            ''
        }
      </Main>
      <BottomNavigation />

    </>
  )
}
export default ProfilePage