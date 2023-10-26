import { useRef, useState } from "react"
import { MdSend } from 'react-icons/md'
import useAuthData from "../../hooks/useAuthData";
import { useOutletContext, useParams } from "react-router-dom";
import { useAddCommentMutation } from "./postsApiSlice";

const CommentInput = ({ refetch }) => {
    const [comment, setComment] = useState('');
    const socket = useOutletContext();
    const ref = useRef(null);
    const { username } = useAuthData();
    const {id} = useParams();
    const [addComment] = useAddCommentMutation();


    const addNewComment = async () => {
        if (comment) {
            try {
                setComment('');
                setShowEmojis(false);
                await addComment({id, comment:{username, message:comment}}).unwrap();
                refetch();
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <section className="flex items-center border-t-2 border-gray-700  gap-2 p-2 bg-light dark:bg-dark">
            <section className="flex  bg-white dark:bg-dark shadow-md pl-4 pr-2 py-3 rounded-full gap-3 items-center justify-between grow">
                <input name="comment" value={comment} onChange={(e) => { setComment(e.target.value) }} className="grow bg-transparent dark:bg-dark" type="text" placeholder="Comment..." />
            </section>
            {
                comment && <button className="bg-blue-500 dark:bg-blue-600 disabled:bg-gray-500 disabled:text-gray-400 text-white rounded-full w-12 h-12 grid place-content-center text-2xl" type="button" onClick={addNewComment}>
                    <MdSend />
                </button>
            }
        </section>
    )
}
export default CommentInput