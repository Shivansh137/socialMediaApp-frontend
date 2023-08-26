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
                <Carousel ratio={post?.ratio}>
                    {
                        post?.media?.map(file => <CarouselImage key={nanoid()} ratio={post?.ratio} src={`https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${file.public_id}.${file.extension}`} />)
                    }
                </Carousel>
                <section className="flex py-4 pr-6 items-center justify-between">
                <div>
                {
                    post?.title && <p className="px-2 pb-1 text-xl">{post?.title}</p>
                }
                <p className="text-sm dark:text-gray-400 px-2 ">Created {formatDistanceToNow(new Date(post?.createdAt ?? Date.now()), { addSuffix: true })}</p>
                </div>
                <Link to='comments'><MdComment size={30} /></Link>
                </section>
                <section className="gap-2 py-2 flex">
                    
                    <button onClick={handleDelete} className="px-2 py-2 border-2 text-[red] border-[red] rounded-xl w-full">
                        <MdDelete size={20} className="inline mx-1" /> Delete Post
                    </button>
                </section>
                <section className="py-2">
                    <div className="flex items-center text-lg gap-2 px-2"> 
                        <BsHeartFill color="red" />
                        <p>Liked By</p>
                    </div>
                   {
                    post?.likes?.length ?  <ul className="py-4 gap-2">
                    {
                        post?.likes.map(like => <li className="dark:bg-dark-sec rounded-md px-4 py-2" >{like}</li>)
                    }
                </ul> : <MdHeartBroken size={50} className="mx-auto my-8 text-gray-300 dark:text-gray-400" />
                   }
                </section>
            </Main>
        </>
    )
}
export default MyPostViewer