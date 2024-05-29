import Carousel from "./Carousel"
import CarouselImage from "./CarouselImage"
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useAddNotificationMutation, useGetProfilePicQuery } from '../user/usersApiSlice'
import { formatDistanceToNow } from 'date-fns'
import { useLikePostMutation } from "./postsApiSlice"
import useAuthData from "../../hooks/useAuthData"
import { useState } from "react"
import { nanoid } from "@reduxjs/toolkit"
import { Link, useOutletContext } from "react-router-dom"
import ProfilePicCircle from "../../components/ProfilePicCircle"
import { IoChatbubbleOutline } from "react-icons/io5"

const Post = ({ post }) => {
  const { username } = useAuthData();
  const [liked, setLiked] = useState(post.likes.includes(username));
  const { data: profilePic } = useGetProfilePicQuery(post?.username);
  const [like] = useLikePostMutation();
  const socket = useOutletContext();
  const [addNotification] = useAddNotificationMutation();

  const handleLike = async (id) => {
    setLiked(e => !e)
    try {
      await like({ id, username }).unwrap();
      if (!liked) {
        socket.emit('like', username, post?.username);
        await addNotification({ username: post?.username, username2: username, message: ' liked your post' }).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <li className="dark:bg-dark-sec m-2 dark:shadow-sm shadow-md border-[1px] dark:border-dark rounded-xl py-4 flex flex-col">
      <Link to={`/${post?.username}`} className="flex items-center gap-4 px-4 pb-4 w-fit">
        {
          <ProfilePicCircle className='w-10 h-10' src={profilePic} />
        }
        <div>
          <p className="text-sm">{post?.username}</p>
          {post?.location && <p className="text-[.6rem] mt-0.5 dark:text-gray-200">{post?.location}</p>}
        </div>

      </Link>
      <Carousel ratio={post?.ratio}>
        {
          post?.media?.map(file => <CarouselImage key={nanoid()} ratio={post?.ratio} src={`https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${file.public_id}.${file.extension}`} />)
        }
      </Carousel>

      {
        post?.title && <p className="px-4 py-2">{post?.title}</p>
      }
      <section className="flex justify-between px-4  pt-2">
        <div className="text-2xl flex gap-4 items-center">
          {
            liked
              ? <BsHeartFill className=" animate-[ping_.25s_linear]" onClick={() => { handleLike(post?._id) }} color="red" stroke={"30"} />
              : <BsHeart onClick={() => { handleLike(post?._id) }} />
          }
          <Link to={`/posts/${post._id}/comments`}>
            <IoChatbubbleOutline />
          </Link>
        </div>
        <div className="text-xs self-end">
          {
            formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })
          }
        </div>
      </section>
    </li>
  )
}
export default Post