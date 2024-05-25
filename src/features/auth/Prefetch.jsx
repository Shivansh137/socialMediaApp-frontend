import { useEffect } from "react"
import { store } from '../../app/store'
import { useAddNotificationMutation, usersApiSlice } from "../user/usersApiSlice"
import useAuthData from "../../hooks/useAuthData"
import { Outlet } from "react-router-dom"
import { io } from 'socket.io-client'
import { addUnreadedMessage, setOnlineUsers, setUnreadedMessages } from "../chat/chatSlice"
import { storyApiSlice } from "../story/storyApiSlice"
import {setAllStories, setMyStories} from '../story/storySlice'
import { useSelector } from "react-redux"
import { selectToken } from "./authSlice"
import { addNotification, setNotifications } from "../notification/notificationsSlice"
import Aside from "../../components/Aside"
import { useGetChatUsersQuery } from "../chat/chatApiSlice"

const Prefetch = () => {
    const { username } = useAuthData();
    const token = useSelector(selectToken);
    const socket = io('https://socialmediaappapi.onrender.com'); // 
    const {refetch} = useGetChatUsersQuery(username);

    useEffect(() => {
        if (username) {
            //SOCKET.IO
            socket.emit('user-joined', username);
            socket.on("recieve-msg", (message) =>{
                refetch();
               store.dispatch(addUnreadedMessage(message));
            });
            socket.on("userJoined", users =>{
               store.dispatch(setOnlineUsers(users));
            });
            socket.on("notification", (username, message) =>{
               store.dispatch(addNotification({username, message, time:new Date().toISOString()}))
            });

            // fetching user
            const user = store.dispatch(usersApiSlice.endpoints.getUserByUsername.initiate(username));

            // fetching unreaded messages
            const unreaded = store.dispatch(usersApiSlice.endpoints.getUnreadedMessages.initiate(username));
            unreaded.then((res)=>{
               store.dispatch(setUnreadedMessages(res?.data))
            })
            // fetching all stories to show
            const stories = store.dispatch(storyApiSlice.endpoints.getAllStories.initiate(username));
            stories.then((res)=>{
                store.dispatch(setAllStories(res?.data));
            })
            // fetching all notifications
            const notifications = store.dispatch(usersApiSlice.endpoints.getAllNotifications.initiate(username));
            notifications.then((res)=>{
                store.dispatch(setNotifications(res?.data));
            })
            //fetching mystories
            const mystories = store.dispatch(storyApiSlice.endpoints.getUserStoriesByUsername.initiate(username));
            mystories.then((res)=>{
                store.dispatch(setMyStories(res?.data));
            })
            return () => {
                user.unsubscribe();
                unreaded.unsubscribe();
            }
        }
    }, [token])

    return <>
 <Aside />
<Outlet context={socket} />
    </>
}
export default Prefetch