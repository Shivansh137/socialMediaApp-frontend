import { useEffect, useRef, useState } from "react"
import {MdAccountCircle, MdEdit} from 'react-icons/md'
import {BsGit, BsGithub, BsInstagram, BsLinkedin} from 'react-icons/bs'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { selectToken, setToken } from "./authSlice"
import { useAddUserMutation } from "../user/usersApiSlice"
import LoadingPage from "../../screens/loading/LoadingScreen"
import ErrorScreen from "../../screens/error/ErrorScreen"
const Register = () => {
  const dispatch = useDispatch();
  const [addUser, {isLoading, isError, error ,isSuccess}] = useAddUserMutation();
  const fileRef = useRef(null);
  const usernameRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);

  const navigate = useNavigate();

  const [profilePic , setProfilePic] = useState('');
  const [url, setUrl] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState({username:"", name:"", password:"", cpassword:""});

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({...data, [name]:value});
  }
  const handleSubmit = async (e)=>{
    //clearing error class
    usernameRef.current?.classList.remove('error_input');
    usernameRef.current?.focus();
    nameRef.current?.classList.remove('error_input');
    nameRef.current?.focus();
    passwordRef.current?.classList.remove('error_input');
    passwordRef.current?.focus();
    cpasswordRef.current?.classList.remove('error_input');
    cpasswordRef.current?.focus();
    setErrMsg('');

    // checking empty input 
   if(!data.username || !data.name || !data.password || !data.cpassword){
      setErrMsg("All fields are required");
      if(!data.username) usernameRef.current?.classList.add('error_input')
      if(!data.name) nameRef.current?.classList.add('error_input')
      if(!data.password) passwordRef.current?.classList.add('error_input')
      if(!data.cpassword) cpasswordRef.current?.classList.add('error_input')
      return;
   }
     // username validation
    if(data.username?.length <6 || data.username?.length > 20){
      usernameRef.current?.classList.add('error_input');
      usernameRef.current?.focus();
      setErrMsg("Username must be 6-20 characters")
      return;
    }
     // name validation
    if(data.name?.length <3 || data.username?.length > 20){
      nameRef.current?.classList.add('error_input');
      nameRef.current?.focus();
      setErrMsg("Name must be 3-20 characters")
      return;
    }
    //password validation 
    if(data.password !== data.cpassword){
      setErrMsg('Passwords are not matching');
      cpasswordRef.current?.focus();
      return;
    }

    // 
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('name', data.name);
    formData.append('password', data.password);
    formData.append('profilePic', profilePic);
     try {
       const responseData = await addUser(formData).unwrap();
        if(responseData?.accessToken){
          dispatch(setToken(responseData?.accessToken));
          navigate('/profile');
        }
     } catch (error) {
      console.log(error);
     }
  }
  useEffect(()=>{
     setErrMsg(error?.data?.message);
  },[error]);

  useEffect(()=>{
    if(profilePic) setUrl(URL.createObjectURL(profilePic));
  },[profilePic])

  return (
    <>
     { isLoading && <LoadingPage/> }
  <main className="p-4 grow flex flex-col justify-center items-center">
      <h2 className="pb-4 text-2xl text_gradient text-center font-[Cookie]">Welcome to SocialMediaApp</h2>
      <form className="flex flex-col gap-4 mb-2 md:w-[25vw] w-full">
        <button type="button" className="flex justify-center w-fit mx-auto items-center relative" onClick={()=>{fileRef.current?.click()}}>
         <input type="file" name="profilePic" onChange={(e)=>{setProfilePic(e.target.files[0])}} id="" hidden={true} ref={fileRef} />
         {
         profilePic ?  <img className="bg-slate-300  rounded-full w-24 h-24 box-content" src={url} alt="" />: <MdAccountCircle size={100} className="text-gray-200 " />
       }
        
         <span className="bg-sky-500 text-white p-2 rounded-full w-6 h-6 grid place-content-center absolute bottom-2 right-2">
         <MdEdit/>
          </span>
        
        </button>
        <input ref={usernameRef} onChange={handleInput} name="username" value={data?.username} type="text" placeholder="username" className="bg-slate-200 px-4 py-4 rounded-lg w-full dark:bg-dark-sec" />
        <input ref={nameRef} onChange={handleInput} name="name" value={data?.name} type="text" placeholder="name" className="bg-slate-200 px-4 py-4 rounded-lg w-full dark:bg-dark-sec" />
        <input ref={passwordRef} onChange={handleInput} name="password" value={data?.password} type="password" placeholder="password" className="bg-slate-200 px-4 py-4 rounded-lg w-full dark:bg-dark-sec" />
        <input ref={cpasswordRef} onChange={handleInput} name="cpassword" value={data?.cpassword} type="password" placeholder="confirm password" className="bg-slate-200 px-4 py-4 rounded-lg w-full dark:bg-dark-sec" />
        {errMsg && <p className="text-red-500 self-start text-xs">{'*' + errMsg}</p>}
        <button onClick={handleSubmit} className="bg-sky-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-sky-600" type="button">Create New Account</button>
      </form>
      <Link to='/login' className="text-blue-500 text-sm text-center hover:text-gray-400 self-center">Already have an account?</Link>
    
       <section className="text-center mt-6 mb-2">
       <p className="text-xs">From</p>
        <p className="text_gradient pt-1">Shivansh</p>
       </section>

       <ul className="flex items-center justify-center gap-4 text-2xl p-4">
        <li><a href="https://github.com/Shivansh137" target="_blank"> <BsGithub/></a></li>
        <li><a href="https://www.instagram.com/shivanshagrawal137/" target="_blank"> <BsInstagram color="hotpink"/></a></li>
        <li><a href="https://www.linkedin.com/in/shivansh-agrawal-529b59255/" target="_blank"> <BsLinkedin color="royalblue"/></a></li>
       </ul>
 
  </main>
    </>
  )
}
export default Register