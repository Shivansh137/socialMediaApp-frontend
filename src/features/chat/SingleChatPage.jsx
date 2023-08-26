import Header from "../../components/Header"
import ChatTextInput from "./ChatTextInput"
import { useGetAllMessagesMutation } from "./chatApiSlice"
import { useEffect, useRef, useState } from "react"
import useAuthData from "../../hooks/useAuthData"
import { useOutletContext, useParams } from "react-router-dom"
import LoadingScreen from "../../screens/loading/LoadingScreen"
import ErrorScreen from '../../screens/error/ErrorScreen'
import { useGetUserByUsernameQuery, useReadUnreadedMessagesMutation } from "../user/usersApiSlice"
import { nanoid } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { emptyUnreadedMessages } from "./chatSlice"
import Main from "../../components/Main"
import ChatHeader from "./ChatHeader"
import ProfilePicCircle from "../../components/ProfilePicCircle"
import LoadingSpinner from "../../screens/loading/LoadingSpinner"
import ChatPage from "./ChatPage"
import { MdArrowDownward} from "react-icons/md"


const SingleChatPage = () => {
  const { username, profilePic } = useAuthData();
  const { username: username2 } = useParams();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const socket = useOutletContext();
  const [getMessages, { isLoading: isLoadingMessages, isSuccess: isMessagesLoaded, isError: isErrorMessages, error: errorMessages }] = useGetAllMessagesMutation();
  const { data: user, isLoading: isLoadingUserData, isSuccess: isUserLoaded, isError: isErrorUser, error: errorUser } = useGetUserByUsernameQuery(username2);
  const [read] = useReadUnreadedMessagesMutation();
  const [messages, setMessages] = useState([]);
  //functions
  const fetchMessages = async () => {
    try {
      scrollRef?.current?.scrollIntoView();
      const result = await getMessages({ username1: username, username2 }).unwrap();
      setMessages(result);
    } catch (error) {
      console.log(error);
    }
  }

  const readMessages = async () => {
    try {
      await read({ sender: username2, reciever: username }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMessages();
    socket?.on("recieve-msg", message => setMessages(msgs => [...msgs, message]));
    readMessages();
  }, [username2])
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
    dispatch(emptyUnreadedMessages())
  })

  if (isLoadingUserData) return <LoadingScreen />
  if (isUserLoaded) return (
    <>
     
    <section className="hidden md:block w-[30vw]">
    <ChatPage />
    </section>
      
    <section className="flex flex-col grow max-w-xl md:relative md:mr-4 overflow-y-scroll md:overflow-hidden">
      <ChatHeader src={user?.profilePic} name={user?.name} username={user?.username} />
      <Main className=' bg-light dark:bg-dark-sec'>
        {
          isErrorMessages && <ErrorScreen error={errorMessages} />
        }
        {
          isLoadingMessages && <LoadingSpinner />
        }

        {
          isMessagesLoaded ? !messages.length && <article className="absolute flex flex-col justify-center items-center w-full top-[50%] text-center -translate-y-[50%]">
            <p className="w-24 text-6xl py-4 text-center">👋🏻</p>
            <p>Say Hi to <span className="text-blue-300">{username2}</span></p>
          </article> : ''
        }
        <button onClick={()=>{ scrollRef?.current?.scrollIntoView({behavior:'smooth'})}} className="absolute text-lg bg-blue-600 rounded-full box-content p-1 right-[3%] bottom-[12%] ">
          <MdArrowDownward />
        </button>
        <ul className="p-2 gap-4 md:gap-8 flex flex-col grow">
          {
            messages.map((msg, i) => <>
              {
                new Date(messages[i]?.updatedAt).getDay() !== new Date(messages[i - 1]?.updatedAt).getDay() ? <li key={nanoid()} className="flex justify-center p-2 bg-slate-200 dark:bg-dark rounded-lg text-sm w-fit mx-auto my-2">{new Date(messages[i]?.updatedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}</li> : ''
              }
              <li key={nanoid()} className={`flex gap-2 max-w-[70%] ${msg?.sender === username ? "self-end flex-row-reverse" : "self-start "} `}>
                {
                  msg?.sender === username ?
                    <ProfilePicCircle className='w-6 h-6 md:w-10 md:h-10 bg-white dark:bg-dark' src={profilePic} />
                    : <ProfilePicCircle className='w-6 h-6 md:w-10 md:h-10 bg-white dark:bg-dark' src={user?.profilePic} />
                }
                <div className={`${msg?.sender === username ? "bg-green-200 dark:text-black" : "bg-white dark:bg-dark shadow-sm"} px-3 rounded-lg min-w-[20vw] md:min-w-[6vw]   flex flex-col items-center justify-between ${msg?.biggerText ? 'text-3xl md:text-4xl pt-2' : 'pb-2 pt-1'}  relative`}>

                  <p className={`${msg.sender === username ? 'text-right':''} w-full my-1 md:mb-3`}>
                    {msg?.message}
                  </p>

                  <span className="text-[10px] self-end text-gray-500">
                    {new Date(msg.updatedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </li>
            </>
            )
          }
        </ul>
        <div className="py-[5vh]" ref={scrollRef}></div>
      </Main>
      {
        isMessagesLoaded && <ChatTextInput fetchMessages={fetchMessages} setMessages={setMessages} />

      }
    </section>
  
    </>
  )
}
export default SingleChatPage