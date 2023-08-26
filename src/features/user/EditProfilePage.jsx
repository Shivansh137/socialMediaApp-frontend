import { MdAccountCircle, MdEdit } from "react-icons/md";
import Header from "../../components/Header"
import useAuthData from "../../hooks/useAuthData"
import TextInput from "../../components/TextInput";
import { useChangePasswordMutation, useGetUserByUsernameQuery, useUpdateUserMutation } from "./usersApiSlice";
import { useEffect, useRef, useState } from "react";
import LoadingSreen from "../../screens/loading/LoadingScreen";
import { useNavigate } from "react-router-dom";
import Main from "../../components/Main";
import { useRefreshMutation } from "../auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setToken } from "../auth/authSlice";

const StyledInput = ({ title, value, onChange }) => {
  return <label className="dark:bg-dark p-4  border-blue-600 border-2 rounded-md relative max-w-sm">
    <span className="text-blue-600 text-sm bg-white z-10 dark:bg-dark px-2 absolute top-0 left-2 -translate-y-[50%]">{title}</span>
    <input value={value} onChange={onChange} className="bg-transparent" type="text" placeholder={title} />
  </label>
}

const EditProfilePage = () => {
  const { username } = useAuthData();
  const { data: user, isLoading:isLoadingUser } = useGetUserByUsernameQuery(username)
  const [newName, setNewName] = useState(user?.name);
  const [currentPassword, setCurrentPassword] = useState('');
  const [file, setFile] = useState('');
  const [url, setUrl] = useState(`https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${user?.profilePic}.png`);
  const [newPassword, setNewPassword] = useState('');
  const profilePicRef = useRef(null);
  const navigate = useNavigate();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [changePassword, {isLoading:isChangingPassword, isError, error}] = useChangePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('name', newName);
    formData.append('profilePic', file);
    try {
      await updateUser(formData).unwrap();
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangePassword = async () => {
     try {
       await changePassword({username, c_password:currentPassword, n_password:newPassword})
       navigate('/profile')
     } catch (error) {
      console.log(error);
     }
  }

  useEffect(() => {
    if (file) setUrl(URL.createObjectURL(file));
  }, [file])

  return (
    <>
      <Header title={'Edit Profile'} />
      <Main className='md:items-center md:justify-center flex flex-col md:gap-4'>
        {
          isLoading || isLoadingUser || isChangingPassword ? <LoadingSreen />
            :
            <>
              <section onClick={() => { profilePicRef.current?.click() }} className="rounded-xl w-fit mx-auto relative">
                <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" name="profile" hidden={true} ref={profilePicRef} />
                {
                  user?.profilePic || url ?
                    <div className='w-28 h-28 rounded-full my-2 bg-sky-100 dark:bg-dark-sec bg-cover' style={{ backgroundImage: `url(${url})` }} ></div>
                    : <p><MdAccountCircle className='text-slate-300 text-8xl' /></p>
                }
                <MdEdit className=" absolute bottom-2 right-2 rounded-full w-6 h-6 p-1 bg-blue-500" />
              </section>
              <p className='text-green-500 dark:text-green-300 bg-light dark:bg-dark-sec w-fit flex items-center gap-1 mx-auto px-3 py-1 rounded-full'>

                {'@' + username}
              </p>
              <form className="flex flex-col max-w-sm py-4 gap-6 ">
                <StyledInput value={newName} onChange={(e) => setNewName(e.target.value)} title='Name' />
                <button onClick={handleSubmit} className="px-4 py-2 rounded-lg my-2 bg-sky-400 dark:bg-blue-600 text-white max-w-sm" >Update Profile</button>
              </form>
                <section className="space-y-4">
                  <p>Change Password</p>
                  <input onChange={(e) => { setCurrentPassword(e.target.value) }} placeholder="Current Password" className="px-4 py-3 w-full dark:bg-dark-sec bg-light rounded-lg max-w-sm" type="password" name="current_password" id="c_password" value={currentPassword} />
                  <input onChange={(e) => { setNewPassword(e.target.value) }} placeholder="New Password" className="px-4 py-3 w-full dark:bg-dark-sec rounded-lg bg-light max-w-sm" type="password" name="current_password" id="n_password" value={newPassword} />
                  {
                    isError && <p className="text-red-500" >{error?.data?.message}</p>
                  }
                  <button onClick={handleChangePassword} className="px-4 py-2 rounded-lg my-2 bg-sky-400 dark:bg-blue-600 text-white max-w-sm w-full" >Update Password</button>

                </section>
            </>
        }
      </Main>
    </>
  )
}
export default EditProfilePage