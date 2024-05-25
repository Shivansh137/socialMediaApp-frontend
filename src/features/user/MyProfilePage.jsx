import useAuthData from '../../hooks/useAuthData';
import Header from '../../components/Header'
import { MdAccountCircle, MdClose, MdDelete, MdFilterNone } from 'react-icons/md';
import { Link, Navigate } from 'react-router-dom';
import { useGetUserByUsernameQuery } from './usersApiSlice';
import LoadingScreen from '../../screens/LoadingScreen';
import ErrorScreen from '../../screens/ErrorScreen';
import BottomNavigation from '../../components/BottomNavigation';
import { useLogoutMutation } from '../auth/authApiSlice';
import { useRef, useState } from 'react';
import { useGetUserPostsByUsernameQuery } from '../post/postsApiSlice';
import Main from '../../components/Main';
import { nanoid } from '@reduxjs/toolkit';
import LogoutLoading from '../../screens/LogoutLoading';
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
      <Main className={'md:ml-32'}>
        {
          isLoggingOut && <LogoutLoading />
        }
        <section className='flex flex-col items-center mt-2 md:mt-8'>
          {
            user?.profilePic ? <div onClick={() => { setShowPic(true) }} className='w-24 h-24 md:w-36 md:h-36 rounded-full my-4 dark:bg-dark-sec bg-cover bg-no-repeat' style={{ backgroundImage: `url(https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${user?.profilePic}.png)` }}></div> : <p><MdAccountCircle className='text-slate-300 text-8xl' /></p>
          }
          {
            user?.profilePic && showPic && (
              <section className='w-screen h-screen md:w-full absolute flex items-center top-0 bg-[rgba(0,0,0,0.75)] z-10 md:hidden'>
                <button onClick={() => { setShowPic(false) }} className='absolute top-2 right-2 bg-dark-sec text-white p-2 rounded-full'>
                  <MdClose />
                </button>
                <ProfilePicCircle src={user?.profilePic} className='w-full rounded-none sm:w-20 sm:h-20 dark:bg-dark-sec pt-[100%]' />

              </section>
            )
          }
        </section>
        <section className='text-center space-y-1'>
          <p className='text-3xl md:text-4xl font-[Cookie]'>{user?.name}</p>
          <p className='text-sky-500 text-xs bg-sky-500/10 w-fit flex items-center mx-auto px-3 py-2 rounded-full'>
            {'@' + username}
          </p>
        </section>

        <ul className='flex md:p-4 px-4 w-full my-4 gap-2'>
          <li className='w-full'>
            <button onClick={() => { postsRef.current?.scrollIntoView({ behavior: 'smooth' }) }} className='flex flex-col shadow-md dark:bg-dark-sec w-full rounded-lg p-4 md:p-6 items-center'>
              <p className='text-2xl'>{myPosts?.length}</p>
              <p className='text-[calc(.5rem+2px)]'>Posts</p>
            </button>
          </li>
          <li className='w-full'>
            <Link to={'followers'} className='flex flex-col shadow-md dark:bg-dark-sec w-full rounded-lg p-4 md:p-6  items-center'>
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


        <section className='flex gap-4 px-4 w-full md:px-8'>
          <button className='dark:bg-primary/25 dark:text-primary bg-primary/80 text-black py-2 rounded-md w-full text-sm'>
            <Link to={'edit'}>Edit Profile</Link>
          </button>
          <button onClick={() => { setShowAlert(true) }} className='bg-red-500/25  text-red-500 py-2 md:py-3 rounded-md w-full font-semibold text-sm'>Logout</button>
          {
            showAlert && (
              <section className='w-screen h-screen md:w-full absolute flex items-center justify-center top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10'>

                <section className='bg-white dark:bg-slate-700 p-10  rounded-lg'>
                  <p>Are you sure you want to Logout?</p>
                  <div className='flex gap-4 pt-8'>
                    <button onClick={handleLogout} className='bg-red-700 text-white py-1 rounded-md w-full'>Logout</button>
                    <button onClick={() => { setShowAlert(false) }} className='bg-red-100 border-2 text-red-700 py-1 rounded-md w-full'>Cancel</button>
                  </div>
                </section>
              </section>
            )
          }
        </section>
        {
          myPosts?.length ? <article ref={postsRef} className='min-h-screen w-full'>
            <section className='grid grid-cols-3 md:grid-cols-4 gap-1 p-4 md:p-8'>
              {
                myPosts.map(myPost => <Link to={`/posts/${myPost._id}`} key={nanoid()} className={`relative w-full aspect-square bg-light shadow-md overflow-hidden rounded-md bg-no-repeat bg-cover`} style={{ backgroundImage: `url(https://res.cloudinary.com/dofd4iarg/image/upload/v1671877960/${myPost.media[0]?.public_id}.${myPost.media[0]?.extension})` }}>

                  {
                    myPost?.media?.length > 1 && <MdFilterNone className='absolute top-1 right-1 text-white bg-[rgba(0,0,0,0.2)] rounded-md box-content p-1 m-1' />
                  }
                </Link>
                )
              }
            </section>
          </article> :
            ''
        }

      </Main>
      <BottomNavigation />
    </>
  )
}
export default MyProfilePage