import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import Header from "../../components/Header"
import { useDeletePostMutation, useGetUserPostsByUsernameQuery } from "../post/postsApiSlice";
import useAuthData from "../../hooks/useAuthData";
import Main from "../../components/Main";
import Carousel from "../post/Carousel";
import CarouselImage from "../post/CarouselImage";
import { nanoid } from "@reduxjs/toolkit";
import { formatDistanceToNow } from "date-fns";
import { MdComment, MdDelete, MdEdit, MdHeartBroken } from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";

const MyPostViewer = () => {
    const { id } = useParams();
    const { username } = useAuthData();
    const navigate = useNavigate();

    const { post } = useGetUserPostsByUsernameQuery(username, {
        selectFromResult: ({ data }) => ({
            post: data?.find(post => post._id === id)
        })
    })
    const [deletePost, {isLoading, isSuccess}] = useDeletePostMutation();

    const handleDelete = async ()=>{
        try {
            await deletePost(id);
            navigate('/profile',{replace:true})
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Header title='Post' />
            <Main>
                <div className="md:w-[70%] p-2 mx-auto">
                <Carousel ratio={post?.ratio}>
                    {
                        post?.media?.map(file => <CarouselImage key={nanoid()} ratio={post?.ratio} src={`https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${file.public_id}.${file.extension}`} />)
                    }
                </Carousel>
                </div>
                <section className="flex p-4 bg-light dark:bg-dark-sec shadow-md md:mx-4 items-center justify-between">
                <div>
                {
                    post?.title && <p className="text-lg">{post?.title}</p>
                }
                <p className="text-xs dark:text-gray-400">Created {formatDistanceToNow(new Date(post?.createdAt ?? Date.now()), { addSuffix: true })}</p>
                </div>
                <section className="flex gap-6">
                <Link to='comments'><MdComment size={28} /></Link>
                <button onClick={handleDelete} className="w-8 h-8 grid place-content-center border-2 text-[red] border-[red] rounded-full">
                        <MdDelete size={20} className="inline mx-1" /> 
                    </button>
                </section>
                </section>
               {
                 post?.likes?.length ?  <section className="p-2">
                 <div className="flex items-center gap-2 px-2"> 
                     <BsHeartFill color="red" /><p>Liked By</p></div>
                 <ul className="py-4 gap-2">
                    {
                     post?.likes.map(like => <li className="dark:bg-dark-sec rounded-md px-4 py-2" >{like}</li>)
                 }
             </ul> 
             </section> : ''
               }
            </Main>
        </>
    )
}
export default MyPostViewer