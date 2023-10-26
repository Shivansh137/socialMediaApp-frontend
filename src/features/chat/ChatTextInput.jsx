import EmojiPicker from "emoji-picker-react"
import { useRef, useState } from "react"
import { MdArrowDownward, MdOutlineEmojiEmotions, MdSend } from 'react-icons/md'
import useAuthData from "../../hooks/useAuthData";
import { useOutletContext, useParams } from "react-router-dom";
import { useAddNewMessageMutation } from "./chatApiSlice";
import { nanoid } from '@reduxjs/toolkit'

const ChatTextInput = ({ setMessages, scrollRef }) => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [message, setMessage] = useState('');
    const socket = useOutletContext();
    const ref = useRef(null);
    const { username } = useAuthData();
    const { username: username2 } = useParams();
    const [addMessage] = useAddNewMessageMutation();


    const addNewMessage = async () => {
        if (message) {
            try {
                setMessage('');
                setShowEmojis(false);
                const newMessage = { sender: username, reciever: username2, message, biggerText: Boolean(!/\P{Extended_Pictographic}/gu.test(Array.from(message).filter(c => ![8205, 65039].includes(c.charCodeAt(0))).join("")) && message.length < 12) };
                setMessages(msgs => [...msgs, { ...newMessage, updatedAt: new Date().toISOString() }])
                socket.emit('send-msg', { reciever: username2, message: { ...newMessage, updatedAt: new Date().toISOString(), isReaded: false, _id: nanoid(10) } })
                await addMessage(newMessage);
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <section className="flex items-center gap-2 px-2 py-2 md:px-4 bg-light dark:bg-dark-sec relative">
             <button onClick={()=>{ scrollRef?.current?.scrollIntoView({behavior:'smooth'})}} className="absolute text-lg bg-blue-600/50 rounded-full p-2 right-[3%] top-[0] translate-y-[-100%] ">
          <MdArrowDownward />
        </button>
            <section className="flex  bg-white dark:bg-dark shadow-sm pl-4 pr-2 py-4 rounded-lg gap-3 items-center justify-between grow">
                <input value={message} onClick={() => { setShowEmojis(false) }} onChange={(e) => { setMessage(e.target.value) }} className="grow bg-transparent dark:bg-dark" type="text" placeholder="Message..." />
            </section>
            {
                message && <button className="bg-blue-500 dark:bg-blue-600 disabled:bg-gray-500 disabled:text-gray-400 text-white rounded-full w-12 h-12 grid place-content-center text-2xl" type="button" onClick={addNewMessage}>
                    <MdSend />
                </button>
            }
        </section>
    )
}
export default ChatTextInput