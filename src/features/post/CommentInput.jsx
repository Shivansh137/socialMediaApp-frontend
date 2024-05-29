import { useState } from "react"
import { MdSend } from 'react-icons/md'
import useAuthData from "../../hooks/useAuthData";
import { useParams } from "react-router-dom";
import { useAddCommentMutation } from "./postsApiSlice";

const CommentInput = ({ refetch }) => {
    const [comment, setComment] = useState('');
    const { username } = useAuthData();
    const { id } = useParams();
    const [addComment] = useAddCommentMutation();

    const addNewComment = async () => {
        if (comment) {
            try {
                setComment('');
                await addComment({ id, comment: { username, message: comment } }).unwrap();
                refetch();
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <section className="flex items-center absolute w-full bottom-0 left-0 gap-2 p-4 bg-light dark:bg-dark">
            <section className="flex bg-white dark:bg-dark-sec shadow-md px-4 py-4 rounded-full gap-3 items-center justify-between grow">
                <input name="comment" value={comment} onChange={(e) => { setComment(e.target.value) }} className="grow dark:bg-dark-sec" type="text" placeholder="Add a Comment..." />
            </section>
            {
                comment && <button className="bg-primary/90 disabled:bg-gray-500 disabled:text-gray-400 text-white rounded-full w-12 h-12 grid place-content-center text-2xl" type="button" onClick={addNewComment}>
                    <MdSend />
                </button>
            }
        </section>
    )
}
export default CommentInput