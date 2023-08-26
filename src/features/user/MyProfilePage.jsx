import useAuthData from '../../hooks/useAuthData';
import Header from '../../components/Header'
import { MdAccountCircle, MdClose, MdDelete, MdFilterNone } from 'react-icons/md';
import { Link, Navigate } from 'react-router-dom';
import { useGetUserByUsernameQuery } from './usersApiSlice';
import LoadingScreen from '../../screens/loading/LoadingScreen';
import ErrorScreen from '../../screens/error/ErrorScreen';
import BottomNavigation from '../../components/BottomNavigation';
import { useLogoutMutation } from '../auth/authApiSlice';
import { useRef, useState } from 'react';
import { useGetUserPostsByUsernameQuery } from '../post/postsApiSlice';
import Main from '../../components/Main';
import { nanoid } from '@reduxjs/toolkit';
import LogoutLoading from '../../screens/loading/LogoutLoading';
import ProfilePicCircle from '../../components/ProfilePicCircle';

const MyProfilePage = () => {
  const [showPic, setShowPic] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const postsRef = useRef(null);
  const { username } = useAuthData();
  const { data: user, isLoading, isSuccess, isError, error } = useGetUserByUsernameQuery(username);
  const { data: myPosts, isLoading: isLoadingMyPosts, isSuccess: isSuccessMyPosts } = useGetUserPostsByUsernameQuery(username);
  const [logout, { isLoading: isLoggingOut, isSuccess: isLoggedOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  if (isLoading || isLoadingMyPosts) return <LoadingScreen />
  if (isError) return <ErrorScreen error={error} />
  if (isLoggedOut) return <Navigate to={'/login'} reset />
  if (isSuccess && isSuccessMyPosts) return (
    <>
      <Header title={"Profile"} />
      <Main className={'px-4 md:p-8 '}>
        {
          isLoggingOut && <LogoutLoading />
        }
        <section className='flex flex-col items-center'>
          {
            user?.profilePic ? <div onClick={() => { setShowPic(true) }} className='w-32 h-32 border-2 rounded-full my-4 bg-light dark:bg-dark-sec bg-cover bg-no-repeat' style={{ backgroundImage: `url(https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${user?.profilePic}.png)` }} alt=""></div> : <p><MdAccountCircle className='text-slate-300 text-8xl' /></p>
          }
          {
            user?.profilePic && showPic && (
              <section className='w-screen h-screen md:w-full absolute flex items-center top-0 bg-[rgba(0,0,0,0.75)] z-10 md:hidden'>
                <button onClick={() => { setShowPic(false) }} className='absolute top-4 right-6 bg-gray-200 dark:bg-dark-sec p-2 rounded-full'>
                  <MdClose />
                </button>
                <ProfilePicCircle src={user?.profilePic} className='w-full rounded-none sm:w-20 sm:h-20 dark:bg-dark-sec pt-[100%]' />

              </section>
            )
          }
        </section>
        <section className='text-center space-y-2'>
          <p className='text-2xl'>{user?.name}</p>
          <p className='text-green-500 dark:text-green-300 bg-light dark:bg-dark-sec w-fit flex items-center gap-1 mx-auto px-3 py-1 rounded-full'>

            {'@' + username}
          </p>
        </section>

        <ul className='flex p-2 md:p-4 w-full gap-2 my-4'>
          <li className='w-full'>
            <button onClick={() => { postsRef.current?.scrollIntoView({ behavior: 'smooth' }) }} className='flex flex-col gap-1 shadow-md dark:bg-dark-sec w-full rounded-lg p-4 items-center'>
              <p className='text-3xl'>{myPosts?.length}</p>
              <p className='text-xs'>Posts</p>
            </button>
          </li>
          <li className='w-full'>
            <Link to={'followers'} className='flex flex-col gap-1 shadow-md dark:bg-dark-sec w-full rounded-lg p-4 items-center'>
              <p className='text-3xl'>{user?.followers?.length}</p>
              <p className='text-xs'>Followers</p>
            </Link>
          </li>
          <li className='w-full'>
            <Link to={'following'} className='flex flex-col gap-1 shadow-md dark:bg-dark-sec w-full  rounded-lg p-4 items-center'>
              <p className='text-3xl'>{user?.following?.length}</p>
              <p className='text-xs'>Following</p>
            </Link>
          </li>
        </ul>


        <section className='flex gap-2 w-full md:px-4'>
          <button className='bg-sky-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg w-full'>
            <Link to={'edit'}>Edit Profile</Link>
          </button>
          <button onClick={() => { setShowAlert(true) }} className='border-[red] border-2 dark:font-semibold text-[red] px-4 py-2 rounded-lg w-full'>Logout</button>
          {
            showAlert && (
              <section className='w-screen h-screen md:w-full absolute flex items-center justify-center top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10'>

                <section className='bg-white dark:bg-slate-700 p-8  rounded-lg'>
                  <p>Are you sure you want to Logout?</p>
                  <div className='flex flex-col gap-2 pt-4'>
                    <button onClick={handleLogout} className='bg-[red] text-white px-4 py-2 rounded-lg w-full'>Logout</button>
                    <button onClick={() => { setShowAlert(false) }} className='border-red-400 border-2 text-red-400 px-4 py-2 rounded-lg w-full'>Cancel</button>
                  </div>
                </section>
              </section>
            )
          }
        </section>
        <hr className='my-4' />
        {
          myPosts?.length ? <article ref={postsRef} className='min-h-screen w-full'>
            <section className='grid grid-cols-2 gap-1'>
              {
                myPosts.map(myPost => <Link to={`/posts/${myPost._id}`} key={nanoid()} className={`relative w-full aspect-square bg-light overflow-hidden rounded-md bg-no-repeat bg-cover`} style={{ backgroundImage: `url(https://res.cloudinary.com/dofd4iarg/image/upload/v1671877960/${myPost.media[0]?.public_id}.${myPost.media[0]?.extension})` }}>

                  {
                    myPost?.media?.length > 1 && <MdFilterNone className='absolute top-1 right-1 text-white bg-[rgba(0,0,0,0.2)] rounded-md box-content p-1 m-1' />
                  }
                </Link>
                )
              }
            </section>
          </article> :
            <article className='h-[30vh] w-full grid place-content-center gap-2 text-center'>
              <p className='text-4xl'>🍃</p>
              <p>No Posts</p>
            </article>
        }

      </Main>
      <BottomNavigation />
    </>
  )
}
export default MyProfilePage