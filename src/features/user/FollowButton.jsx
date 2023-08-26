import { Navigate, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { selectUserData, useAddNotificationMutation, useToggleFollowMutation } from "./usersApiSlice";
import useAuthData from "../../hooks/useAuthData";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useEffect, useState } from "react";
import LoadingSpinner from '../../screens/loading/LoadingSpinner'
import { useGetAllStoriesQuery } from "../story/storyApiSlice";


const FollowButton = ({username,classname}) => {
  const [toggleFollow,{isLoading}] = useToggleFollowMutation();
  const { username:myUsername} = useAuthData();
  const user = useSelector(state => selectUserData(state, myUsername));
  const [isFollowing, setIsFollowing] = useState(false);
    const token = useSelector(selectToken);
    const navigate = useNavigate();
    const socket = useOutletContext();
    const [addNotification] = useAddNotificationMutation();
    const {data, refetch} = useGetAllStoriesQuery(myUsername);

    useEffect(()=>{
        setIsFollowing(user?.following?.includes(username))
    },[user])
    const handleFollow = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if(!token){
       navigate('/login');
        return;
      }
      else{
        try {
          await toggleFollow({ followerUsername:myUsername,followingUsername:username}).unwrap();
          refetch();
          if(!isFollowing){
            socket.emit('follow', myUsername, username);
            await addNotification({username,username2:myUsername, message:'started following you'}).unwrap();
          }
        } catch (error) {
          console.log(error);
        }
     }
    }
  return (
    <button disabled={isLoading} onClick={handleFollow} className={`${isFollowing?'border-gray-300 border-2 text-gray-500 dark:bg-dark dark:border-dark-sec dark:text-gray-300':'bg-sky-500 dark:bg-blue-600 text-white'}  disabled:text-gray-400 grid place-content-center px-4 py-2 rounded-lg ${classname}`}>
     { isLoading ? 'Loading...' : isFollowing ? 'Remove': 'Follow'}
      </button>
  )
}
export default FollowButton