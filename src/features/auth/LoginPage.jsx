import {  useRef, useState } from "react"
import {  BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import LoadingPage from "../../screens/loading/LoadingScreen"
import { useLoginMutation } from "./authApiSlice"
import { setToken } from '../auth/authSlice'
const LoginPage = () => {
  const [login, {isLoading }] = useLoginMutation();
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState({ username: "", password: "" });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  }
  const handleSubmit = async (e) => {
    //clearing error class
    usernameRef.current?.classList.remove('error_input');
    usernameRef.current?.focus();
    passwordRef.current?.classList.remove('error_input');
    passwordRef.current?.focus();
    setErrMsg('');

    // checking empty input 
    if (!data.username || !data.password) {
      setErrMsg("All fields are required");
      if (!data.username) usernameRef.current?.classList.add('error_input')
      if (!data.password) passwordRef.current?.classList.add('error_input')
      return;
    }
    try {
      const responseData = await login({ username: data.username, password: data.password }).unwrap();
      if (responseData?.accessToken) {
        dispatch(setToken(responseData?.accessToken));
        setIsLoginSuccess(true);
      }
    } catch (error) {
      setErrMsg(error?.data?.message);
    }
  }
  if (isLoginSuccess) return <Navigate to={'/'} reset />
  if(isLoading) return <LoadingPage />
  return (
    <>
      <main className="p-4 text-center flex flex-col items-center grow">
      <p className="p-4 text-2xl font-[Cookie] mb-auto">SocialMediaApp</p>

        <form className="flex flex-col gap-4  w-screen px-6 py-3 sm:w-[20vw]">
        <h2 className=" text-2xl text_gradient text-center font-[Cookie]">Login to continue...</h2>
          <input ref={usernameRef} onChange={handleInput} name="username" value={data?.username} type="text" placeholder="username" className="bg-slate-200 dark:bg-dark-sec px-4 py-3 rounded-lg block" />
          <input ref={passwordRef} onChange={handleInput} name="password" value={data?.password} type="password" placeholder="password" className="bg-slate-200 dark:bg-dark-sec px-4 py-3 rounded-lg" />
          {errMsg && <p className="text-red-500 self-start text-xs">{'*' + errMsg}</p>}
          <button onClick={handleSubmit} className="bg-sky-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-sky-600" type="button">Login</button>
        </form>
        <Link to='/register' className="text-blue-400 text-xs text-center hover:text-gray-400 self-center">Don't have an account?</Link>

        <section className="text-center mt-auto">
          <p className="text-xs">From</p>
          <p className="text_gradient pt-1">Shivansh</p>
        </section>

      </main>
    </>
  )
  }
export default LoginPage