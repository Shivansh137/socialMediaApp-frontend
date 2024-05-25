import { useRef, useState } from "react"
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import LoadingScreen from "../../screens/LoadingScreen"
import { useLoginMutation } from "./authApiSlice"
import { setToken } from '../auth/authSlice'
import Logo from "../../components/Logo"

const LoginPage = () => {

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  // refs
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  // states
  const [errMsg, setErrMsg] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [data, setData] = useState({ username: "", password: "" });

  // functions
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  }
  const handleSubmit = async (e) => {
    //clearing error class before checking the inputs again
    usernameRef.current?.classList.remove('error_input');
    passwordRef.current?.classList.remove('error_input');
    setErrMsg('');

    // checking empty input 
    if (!data.username || !data.password) {
      setErrMsg("All fields are required");
      if (!data.username) {
        usernameRef.current?.classList.add('error_input');
        usernameRef.current?.focus();
      }
      if (!data.password) {
        passwordRef.current?.classList.add('error_input');
        passwordRef.current?.focus();
      }
      return;
    }

    // Sending login request
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
  if (isLoading) return <LoadingScreen />
  return (
    <>
      <main className="p-4 text-center flex flex-col items-center grow">
        <div className="mt-auto">
          <Logo fontSize={32} />
          <div className="mt-2 text-xl text-[rgba(180,180,180,0.8)]">Welcome to Connect</div>
        </div>
        <form className="flex flex-col gap-6 mt-8 mb-auto w-screen px-6 py-3 max-w-md">
          <p className="my-2">Login with username</p>
          <input ref={usernameRef} onChange={handleInput} name="username" value={data?.username} type="text" placeholder="username" className="bg-slate-200 dark:bg-dark-sec px-4 py-3 rounded-lg block" />
          <input ref={passwordRef} onChange={handleInput} name="password" value={data?.password} type="password" placeholder="password" className="bg-slate-200 dark:bg-dark-sec px-4 py-3 rounded-lg" />
          {errMsg && <p className="text-red-500 self-start text-xs">{'*' + errMsg}</p>}
          <button onClick={handleSubmit} className=" bg-sky-500 text-white w-full mx-auto p-3 rounded-lg hover:bg-sky-600" type="button">Login</button>
          <Link to='/register' className=" text-xs text-center hover:text-gray-400 self-center">Don't have an account?</Link>
        </form>

      </main>
    </>
  )
}
export default LoginPage