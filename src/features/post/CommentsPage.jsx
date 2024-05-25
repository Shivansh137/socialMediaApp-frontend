import Main from '../../components/Main'
import Header from '../../components/Header'
import Comment from './Comment'
import { useParams } from 'react-router-dom'
import { useGetCommentsQuery } from './postsApiSlice'
import LoadingScreen from '../../screens/LoadingScreen'
import CommentInput from './CommentInput'
import LoadingSpinner from '../../screens/LoadingSpinner'
import { BiSolidChat } from 'react-icons/bi'

const CommentsPage = () => {
  const { id } = useParams();
  const { data: comments, isLoading, isSuccess, isFetching, refetch } = useGetCommentsQuery(id);
  if (isLoading) return <LoadingScreen />
  if (isSuccess) return (
    <>
      <Main className={'relative'}>
        {
          isFetching ? <LoadingSpinner /> : <>
            <Header title='Comments' />
            {
              !comments.length && <article className='flex flex-col items-center mt-[75%]'>
                <BiSolidChat size={75} />
                <p>Add a Comment</p>
              </article>
            }
            <ul className='flex flex-col gap-4 pt-4'>
              {
                comments?.map(comment => <Comment key={comment._id} comment={comment} />)
              }
            </ul>
          </>
        }
      <CommentInput refetch={refetch} />
      </Main>
    </>
  )
}
export default CommentsPage