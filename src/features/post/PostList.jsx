import Post from "./Post"
import { useGetAllPostsByUsernameQuery } from "./postsApiSlice"
import useAuthData from '../../hooks/useAuthData'
import { MdPeople } from "react-icons/md"
import ErrorScreen from "../../screens/ErrorScreen"
import LoadingSpinner from "../../screens/LoadingSpinner"

const PostList = () => {
  const { username } = useAuthData();
  const { data: posts, isLoading, isSuccess, isError, error } = useGetAllPostsByUsernameQuery(username)
  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorScreen error={error} />
  if (isSuccess) return (
    posts?.length ? <ul className="flex flex-col max-w-lg mx-auto gap-4 pb-4 ">
      {
        posts?.map(post => <Post key={post._id} post={post} />)
      }
    </ul> : <article className="text-center flex flex-col items-center p-8 gap-4 dark:bg-dark-sec rounded-xl ">
      <MdPeople size="50" />
      <p className="max-w-[40vw] text-sm">Follow more people to see their posts</p>
    </article>
  )
}
export default PostList