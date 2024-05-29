import { useState } from "react"
import { MdArrowDownward, MdSend } from 'react-icons/md'
import useAuthData from "../../hooks/useAuthData";
import { useOutletContext, useParams } from "react-router-dom";
import { useAddNewMessageMutation } from "./chatApiSlice";
import { nanoid } from '@reduxjs/toolkit'

const ChatTextInput = ({ setMessages, scrollRef }) => {
    const [message, setMessage] = useState('');
    const socket = useOutletContext();
    const { username } = useAuthData();
    const { username: username2 } = useParams();
    const [addMessage] = useAddNewMessageMutation();
    const addNewMessage = async () => {
        try {
            let newMessage = {
                sender: username,
                reciever: username2,
                message,
                biggerText: Boolean(!/\P{Extended_Pictographic}/gu.test(Array.from(message).filter(c => ![8205, 65039].includes(c.charCodeAt(0))).join("")) && message.length < 12),
                isReaded: false,
                time: Date.now()
            }
            socket.emit('send-msg', { reciever: username2, message: { ...newMessage, _id: nanoid() } });
            setMessages(msgs => [...msgs, newMessage]);
            setMessage('');
            await addMessage(newMessage);
        } catch (error) {
            console.log(error);
        }
    }
    const handleInput = (e) => {
        socket.emit('sendTypingStatus', username, username2);
        setMessage(e.target.value);
    }
    return (
        <section className="flex items-center gap-2 px-2 py-2 md:px-4 bg-light dark:bg-dark relative">
            <button onClick={() => { scrollRef?.current?.scrollIntoView({ behavior: 'smooth' }) }} className="absolute text-lg bg-sky-600/50 rounded-full p-2 right-[3%] top-[0] translate-y-[-110%] ">
                <MdArrowDownward />
            </button>
            <section className="flex bg-white dark:bg-dark-sec shadow-md border dark:border-0 pl-4 pr-2 py-4 rounded-lg gap-3 items-center justify-between grow">
                <input value={message} onChange={handleInput} className="grow bg-transparent" type="text" placeholder="Message..." />
            </section>
            {
                message && <button className="bg-blue-500 dark:bg-blue-600 disabled:bg-gray-500 disabled:text-gray-400 text-white rounded-full w-12 h-12 grid place-content-center text-2xl" type="submit" onClick={addNewMessage}>
                    <MdSend />
                </button>
            }
        </section>
    )
}
export default ChatTextInput