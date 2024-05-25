import { useEffect, useRef, useState } from "react"
import { MdAccountCircle, MdAdd } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setToken } from "./authSlice"
import { useAddUserMutation } from "../user/usersApiSlice"
import LoadingScreen from "../../screens/LoadingScreen"
import ErrorScreen from '../../screens/ErrorScreen'
import Logo from '../../components/Logo'

const Register = () => {
  // Input refs
  const fileRef = useRef(null);
  const usernameRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);

  const [addUser, { isLoading, isError, error }] = useAddUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States
  const [profilePic, setProfilePic] = useState('');
  const [url, setUrl] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState({ username: "", name: "", password: "", cpassword: "" });

  // Functions
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = async (e) => {
    //clearing error before checking the inputs again
    usernameRef.current?.classList.remove('error_input');
    nameRef.current?.classList.remove('error_input');
    passwordRef.current?.classList.remove('error_input');
    cpasswordRef.current?.classList.remove('error_input');
    setErrMsg('');

    // checking empty input 
    if (!data.username || !data.name || !data.password || !data.cpassword) {
      setErrMsg("All fields are required");
      if (!data.cpassword) {
        cpasswordRef.current?.classList.add('error_input')
        cpasswordRef.current?.focus();
      }
      if (!data.password) {
        passwordRef.current?.classList.add('error_input')
        passwordRef.current?.focus();
      }
      if (!data.name) {
        nameRef.current?.classList.add('error_input')
        nameRef.current?.focus();
      }
      if (!data.username) {
        usernameRef.current?.classList.add('error_input')
        usernameRef.current?.focus();
      }
      return;
    }

    // username validation
    if (data.username?.length < 6 || data.username?.length > 20) {
      usernameRef.current?.classList.add('error_input');
      usernameRef.current?.focus();
      setErrMsg("Username must be 6-20 characters")
      return;
    }
    // name validation
    if (data.name?.length < 3 || data.username?.length > 20) {
      nameRef.current?.classList.add('error_input');
      nameRef.current?.focus();
      setErrMsg("Name must be 3-20 characters")
      return;
    }
    //password validation 
    if (data.password?.length < 6) {
      passwordRef.current?.classList.add('error_input');
      passwordRef.current?.focus();
      setErrMsg("Password must contain atleast 6 characters")
      return;
    }
    if (data.password !== data.cpassword) {
      cpasswordRef.current?.focus();
      cpasswordRef.current?.classList.add('error_input');
      setErrMsg('Passwords are not matching');
      return;
    }
    // Creating form data
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('name', data.name);
    formData.append('password', data.password);
    formData.append('profilePic', profilePic);
    try {
      const responseData = await addUser(formData).unwrap();
      if (responseData?.accessToken) {
        dispatch(setToken(responseData?.accessToken));
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // useEffects
  useEffect(() => setErrMsg(error?.data?.message), [error]);

  useEffect(() => {
    if (profilePic) setUrl(URL.createObjectURL(profilePic));
  }, [profilePic]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {isError && <ErrorScreen error={error} />}
      <main className="p-4 grow flex flex-col justify-center items-center">
        <div className="mt-auto flex flex-col items-center ">
          <Logo fontSize={32} />
          <div className="mt-2 text-lg text-[rgba(180,180,180,0.8)]">Welcome to Connect</div>
        </div>
        <form className="flex flex-col gap-3 max-w-md my-auto w-full p-4">
          <button type="button" className="flex rounded-full justify-center w-fit mx-auto mb-4 items-center relative" onClick={() => { fileRef.current?.click() }}>
            <input type="file" name="profilePic" accept="image/png,image/jpeg" onChange={(e) => { setProfilePic(e.target.files[0]) }} id="" hidden={true} ref={fileRef} />
            {
              profilePic ? <img className="bg-slate-200  rounded-full w-24 h-24 box-content" src={url} alt="" /> : <MdAccountCircle size={110} color="#ddd" />
            }

            <span className="bg-primary text-white p-2 rounded-full w-6 h-6 grid place-content-center absolute bottom-2 right-2">
              <MdAdd />
            </span>

          </button>
          <input ref={usernameRef} onChange={handleInput} name="username" value={data?.username} type="text" placeholder="username" className="bg-slate-200 px-4 py-3 rounded-lg w-full dark:bg-dark-sec" />

          <input ref={nameRef} onChange={handleInput} name="name" value={data?.name} type="text" placeholder="name" className="bg-slate-200 px-4 py-3 rounded-lg w-full dark:bg-dark-sec" />

          <input ref={passwordRef} onChange={handleInput} name="password" value={data?.password} type="password" placeholder="password" className="bg-slate-200 px-4 py-3 rounded-lg w-full dark:bg-dark-sec" />

          <input ref={cpasswordRef} autoComplete="off" onChange={handleInput} name="cpassword" value={data?.cpassword} type="password" placeholder="confirm password" className="bg-slate-200 px-4 py-3 rounded-lg w-full dark:bg-dark-sec" />

          {errMsg && <p className="text-red-500 self-start text-xs">{'*' + errMsg}</p>}

          <button onClick={handleSubmit} className="bg-sky-500 dark:bg-[#111] text-white p-3 rounded-lg hover:bg-sky-600 text-sm mt-2" type="button">Create New Account</button>

          <Link to='/login' className=" text-xs text-center ">Already have an account?</Link>
        </form>

      </main>
    </>
  )
}
export default Register