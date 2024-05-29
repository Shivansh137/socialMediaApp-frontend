import ChatTextInput from "./ChatTextInput"
import { useGetAllMessagesMutation } from "./chatApiSlice"
import { useEffect, useRef, useState } from "react"
import useAuthData from "../../hooks/useAuthData"
import { useOutletContext, useParams } from "react-router-dom"
import LoadingScreen from "../../screens/LoadingScreen"
import ErrorScreen from '../../screens/ErrorScreen'
import { useGetUserByUsernameQuery, useReadUnreadedMessagesMutation } from "../user/usersApiSlice"
import { nanoid } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { removeUnreadedMessages, selectOnlineUsers, selectTypingUsers } from "./chatSlice"
import Main from "../../components/Main"
import ChatHeader from "./ChatHeader"
import ProfilePicCircle from "../../components/ProfilePicCircle"
import LoadingSpinner from "../../screens/LoadingSpinner"
import ChatPage from "./ChatPage"

const SingleChatPage = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const socket = useOutletContext();
  const { username: username2 } = useParams();
  const [messages, setMessages] = useState([]);
  const { username, profilePic } = useAuthData();
  const [read] = useReadUnreadedMessagesMutation();
  const onlineUsers = useSelector(selectOnlineUsers);
  const typingUsers = useSelector(selectTypingUsers);
  const { data: user, isLoading: isLoadingUserData, isSuccess: isUserLoaded } = useGetUserByUsernameQuery(username2);
  const [getMessages, { isLoading: isLoadingMessages, isSuccess: isMessagesLoaded, isError: isErrorMessages, error: errorMessages }] = useGetAllMessagesMutation();

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
    readMessages();
  }, []);

  useEffect(() => {
    socket.on('recieve-msg', msg => {
      if (msg.sender === username2) setMessages(msgs => [...msgs, msg])
    })
  }, [socket, username2]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
    dispatch(removeUnreadedMessages(username2));
  });

  if (isLoadingUserData) return <LoadingScreen />
  if (isUserLoaded) return (
    <>
      <section className="hidden md:block w-[30vw]">
        <ChatPage />
      </section>

      <section className="flex flex-col grow max-w-xl md:relative md:mr-4 overflow-y-scroll md:overflow-hidden">
        <ChatHeader src={user?.profilePic} name={user?.name} username={user?.username} isOnline={onlineUsers.includes(username2)} />
        <Main className=' bg-white dark:bg-black'>
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

          <ul className="p-2 gap-4 md:gap-8 flex flex-col grow">
            {
              messages.map((msg, i) => <div key={nanoid()}>
                {
                  new Date(messages[i]?.time).getDay() !== new Date(messages[i - 1]?.time).getDay() ? <li className="flex justify-center p-2 bg-neutral-200 bg-primary/20 dark:text-primary text-yellow-800 rounded-lg text-xs w-fit mx-auto my-4">{new Date(messages[i]?.time).toLocaleDateString('en-US', { dateStyle: 'medium' })}</li> : ''
                }
                <li className={`flex gap-2 ${msg?.sender === username ? "self-end flex-row-reverse" : "self-start "} `}>
                  {
                    msg?.sender === username ?
                      <ProfilePicCircle className='w-6 h-6 md:w-10 md:h-10 bg-white dark:bg-dark' src={profilePic} />
                      : <ProfilePicCircle className='w-6 h-6 md:w-10 md:h-10 bg-white dark:bg-dark' src={user?.profilePic} />
                  }
                  <div className={`${msg?.sender === username ? "bg-green-100 dark:bg-green-500/20  dark:text-green-500 " : "bg-sky-100 dark:bg-sky-500/20 dark:text-sky-500"} pl-3 pr-2 max-w-[75%] rounded-md flex flex-col gap-1  ${msg?.biggerText ? 'text-3xl md:text-4xl pt-2' : 'py-1.5'}  relative`}>
                    <p>
                      {msg?.message}
                    </p>

                    <span className="text-[10px] self-end text-gray-500">
                      {new Date(msg.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </li>
              </div>
              )
            }
            {
              typingUsers[username2] ? <li className={`flex gap-2 `}>
                <ProfilePicCircle className='w-6 h-6 md:w-10 md:h-10 bg-white dark:bg-dark' src={user?.profilePic} />
                <div className={`bg-primary/10 p-4 rounded-md flex items-center gap-2 relative`}>
                  <div className="w-2 h-2 animate-bounce bg-primary rounded-full"></div>
                  <div className="w-2 h-2 animate-bounce bg-primary rounded-full"></div>
                  <div className="w-2 h-2 animate-bounce bg-primary rounded-full"></div>
                </div>
              </li> : ""
            }
          </ul>
          <div className="py-[5vh]" ref={scrollRef}></div>
        </Main>
        {
          isMessagesLoaded && <ChatTextInput scrollRef={scrollRef} fetchMessages={fetchMessages} setMessages={setMessages} />
        }
      </section>
    </>
  )
}
export default SingleChatPage