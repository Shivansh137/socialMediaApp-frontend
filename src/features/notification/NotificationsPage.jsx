import Main from '../../components/Main'
import Header from '../../components/Header'
import Notification from './Notification'
import useAuthData from '../../hooks/useAuthData'
import { useClearNotificationsMutation } from '../user/usersApiSlice'
import LoadingScreen from '../../screens/LoadingScreen'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotifications, selectAllNotifications } from './notificationsSlice'
import { useEffect } from 'react'
import { MdNotificationsOff } from 'react-icons/md'

const NotificationsPage = () => {
  const { username } = useAuthData();
  const notifications = useSelector(selectAllNotifications);
  const dispatch = useDispatch();
  const [clearNotificationsDataBase] = useClearNotificationsMutation();
  const clearNotificationsFromDB = async () => {
    try {
      await clearNotificationsDataBase(username).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    return () => {
      clearNotificationsFromDB();
      dispatch(clearNotifications());
    }
  }, [])
  return (
    <>
      <Header title='Notifications' />
      <Main className='relative'>
        {
          !notifications ? <LoadingScreen /> : <>

            {
              notifications?.length ? <ul>
                {
                  notifications.map((notification, i) => <div key={nanoid()}>
                    {
                      !notifications[i - 1] || new Date(notifications[i]?.time).getDay() > new Date(notifications[i - 1]?.time).getDay() ?
                        <li className='px-4 py-1 bg-primary/20 text-primary mx-auto w-fit rounded-full my-2 text-xs'>{new Date(notification?.time).toLocaleDateString('en-Us', { dateStyle: 'medium' })}</li> : ''
                    }
                    <Notification username={notification.username} message={notification.message} time={notification?.time} />
                  </div>)
                }
              </ul> : <section className="items-center grow relative text-center top-[50%] -translate-y-[50%] flex flex-col gap-4">
                <p className="text-6xl">
                  <MdNotificationsOff />
                </p>
                <p className="font-bold">No new Notification</p>
              </section>
            }
          </>
        }
      </Main>
    </>
  )
}
export default NotificationsPage