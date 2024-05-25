import { MdAccountCircle } from "react-icons/md";
import Header from "../../components/Header"
import useAuthData from "../../hooks/useAuthData"
import { useChangePasswordMutation, useGetUserByUsernameQuery, useUpdateUserMutation } from "./usersApiSlice";
import { useEffect, useRef, useState } from "react";
import LoadingSreen from "../../screens/LoadingScreen";
import { useNavigate } from "react-router-dom";
import Main from "../../components/Main";

const EditProfilePage = () => {
  const { username } = useAuthData();
  const { data: user, isLoading: isLoadingUser } = useGetUserByUsernameQuery(username)
  const [newName, setNewName] = useState(user?.name);
  const [currentPassword, setCurrentPassword] = useState('');
  const [file, setFile] = useState('');
  const [url, setUrl] = useState(`https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${user?.profilePic}.png`);
  const [newPassword, setNewPassword] = useState('');
  const profilePicRef = useRef(null);
  const navigate = useNavigate();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [changePassword, { isLoading: isChangingPassword, isError, error }] = useChangePasswordMutation();

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
      await changePassword({ username, c_password: currentPassword, n_password: newPassword })
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
      <Main className=' flex flex-col gap-2 md:gap-4 p-4'>
        {
          isLoading || isLoadingUser || isChangingPassword ? <LoadingSreen />
            :
            <>
              <section onClick={() => { profilePicRef.current?.click() }} className="mx-auto relative">
                <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" accept="image/png, image/jpeg" name="profile" hidden={true} ref={profilePicRef} />
                {
                  user?.profilePic || url ?
                    <div className='w-28 h-28 rounded-full bg-cover' style={{ backgroundImage: `url(${url})` }} ></div>
                    : <p><MdAccountCircle className='text-slate-300 text-8xl' /></p>
                }
              </section>
              <p className='text-primary text-sm bg-light dark:bg-primary/25 w-fit flex items-center gap-1 mx-auto mt-2 px-4 py-2 rounded-full'>
                {'@' + username}
              </p>
              <form className="flex flex-col max-w-md py-4 gap-6 ">
                <label htmlFor="name" className="w-full p-1 space-y-2">
                  <p className="px-2 text-primary">Name</p>
                  <input id="name" className="px-4 py-3 w-full bg-light dark:bg-dark-sec rounded-md" value={newName} onChange={(e) => setNewName(e.target.value)} type="text" placeholder='Name' />
                </label>
                <button onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-primary text-black max-w-sm" >Update Profile</button>
              </form>
              <hr />
              <section className="space-y-4 my-2">
                <p>Change Password</p>
                <input onChange={(e) => { setCurrentPassword(e.target.value) }} placeholder="Current Password" className="px-4 py-3 w-full dark:bg-dark-sec bg-light rounded-lg max-w-sm" type="password" name="current_password" id="c_password" value={currentPassword} />
                <input onChange={(e) => { setNewPassword(e.target.value) }} placeholder="New Password" className="px-4 py-3 w-full dark:bg-dark-sec rounded-lg bg-light max-w-sm" type="password" name="current_password" id="n_password" value={newPassword} />
                {
                  isError && <p className="text-red-500" >{error?.data?.message}</p>
                }
                <button onClick={handleChangePassword} className="px-4 py-2 rounded-lg my-2 bg-primary text-black max-w-sm w-full" >Update Password</button>

              </section>
            </>
        }
      </Main>
    </>
  )
}
export default EditProfilePage