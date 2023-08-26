import Post from "./Post"
import { useGetAllPostsByUsernameQuery } from "./postsApiSlice"
import useAuthData from '../../hooks/useAuthData'
import LoadingSreen from '../../screens/loading/LoadingScreen'
import { MdAddBox, MdCheck, MdFollowTheSigns } from "react-icons/md"
import ErrorScreen from "../../screens/error/ErrorScreen"

const PostList = () => {
  const {username} = useAuthData();
  const {data:posts, isLoading, isSuccess, isError ,error} = useGetAllPostsByUsernameQuery(username)
  if(isLoading) return <LoadingSreen />
  if (isError) return <ErrorScreen error={error} />
  if(isSuccess) return (
       posts?.length ? <ul className="flex flex-col max-w-lg mx-auto gap-4 pb-4">
      {
        posts?.map(post => <Post key={post._id} post={post}/>) 
      }
       </ul> : <article className="text-center flex flex-col items-center p-4 gap-4 dark:bg-dark-sec rounded-xl">
        <MdAddBox size="50" />
        <p className="max-w-[40vw]">Follow more people to see thier posts</p>
      </article>
    
  
  )
}
export default PostList