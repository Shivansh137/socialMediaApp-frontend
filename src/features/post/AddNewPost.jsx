import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header"
import Main from "../../components/Main"
import useAuthData from "../../hooks/useAuthData"
import { useNavigate } from "react-router-dom";
import { MdDelete, MdUploadFile } from 'react-icons/md'
import LoadingSreen from '../../screens/LoadingScreen'
import TextInput from "../../components/TextInput";
import { useAddPostMutation } from "./postsApiSlice";


const AddNewPost = () => {
    const navigate = useNavigate();
    const { username } = useAuthData();
    const inputRef = useRef(null);
    const addMoreInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [base64s, setBase64s] = useState([]);
    const [ratio, setRatio] = useState('1/1');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [addPost, { isLoading }] = useAddPostMutation();

    const toDataUrl = (file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result);
            }
            reader.onerror = () => {
                reject(reader.error);
            }
        })
    }

    const handleFiles = async (e) => {
        setFiles(files => [...files, ...e.target.files]);
        for (var i = 0; i < e.target?.files?.length; i++) {
            const url = await toDataUrl(e.target.files[i]);
            setBase64s(i => [...i, url]);
        }
    }
    const handleDeleteImage = (i) => {
        setFiles(e => {
            let copy = [...e];
            copy.splice(i, 1);
            return copy;
        })
        setBase64s(e => {
            let copy = e.filter(base64 => base64 !== e[i])
            return copy;
        })
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('title', title);
        formData.append('location', location);
        formData.append('ratio', ratio);
        files.forEach(file => {
            formData.append('postFiles', file);
        })
        try {
            await addPost(formData).unwrap();
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        inputRef.current?.click();
    }, [])

    if (isLoading) return <LoadingSreen />
    return (
        <Main className={'relative'}>
            <input ref={inputRef} onChange={handleFiles} type="file" accept="image/png, image/jpeg" multiple={true} name="file" id="" hidden={true} />
            <input ref={addMoreInputRef} onChange={handleFiles} type="file" accept="image/png, image/jpeg" multiple={true} name="addfile" id="" hidden={true} />
            {
                !base64s?.length && <>
                    <Header title="Create New Post" />
                    <section className="rounded-lg absolute w-full top-[50%] -translate-y-[50%] bg-gray-50 dark:bg-dark-sec py-4 flex flex-col items-center gap-4 ">
                        <section className="p-4">
                            <MdUploadFile size={50} className="mx-auto my-4" />
                            No image selected
                        </section>
                        <div className="w-full flex flex-col gap-2 p-4">
                            <button onClick={() => { inputRef.current?.click() }} className=" py-2 rounded-md bg-sky-400 text-white dark:bg-blue-600 w-full text-sm">Select images</button>
                            <button onClick={() => { navigate('/') }} className=" text-sm text-blue-400 py-2 rounded-md border-2 border-blue-500 w-full">Cancel</button>
                        </div>
                    </section>
                </>
            }
            {
                base64s?.length ? <>
                    <section className="flex p-4 rounded-md">
                        <button onClick={() => { setRatio('1/1') }} className={` w-10 h-8 rounded-l-md transition-[background-color] delay-50 text-xs ${ratio === '1/1' ? 'bg-primary text-black' : ' bg-gray-100 dark:bg-dark-sec'}`} type="button">
                            1 : 1
                        </button>
                        <button onClick={() => { setRatio('4/5') }} className={` w-10 h-8  rounded-r-md transition-[background-color] delay-50 text-xs  ${ratio !== '1/1' ? 'bg-primary text-black' : 'bg-gray-100 dark:bg-dark-sec'}`} type="button">
                            4 : 5
                        </button>
                        <button onClick={() => { navigate('/') }} className="ml-auto text-sm">Cancel</button>
                    </section>

                    <ul className={` p-2 rounded-lg overflow-y-hidden space-x-2 whitespace-nowrap`}>
                        {
                            base64s?.map((base64, i) => <li className={`w-[50%] bg-no-repeat bg-cover inline-block relative rounded-md`} style={{ backgroundImage: `url(${base64})`, paddingTop: `${ratio?.charAt(2) / ratio?.charAt(0) * 50 + '%'}` }}>

                                <MdDelete className="text-white bg-[rgba(0,0,0,0.5)] box-content p-2 rounded-full text-sm absolute top-1 left-1" onClick={() => { handleDeleteImage(i) }} />
                                <span className="text-white bg-[rgba(0,0,0,0.5)] box-content p-0.5 text-xs absolute top-0 right-0">{i + 1}/{base64s?.length}</span>

                            </li>)
                        }
                    </ul>
                    <button onClick={() => { addMoreInputRef.current?.click() }} className=" p-2 text-sm text-primary w-[90%] mx-auto block">Add More + </button>
                    <form className="flex flex-col p-4 gap-3 my-4">

                        <TextInput value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Title" />
                        <TextInput value={location} onChange={(e) => { setLocation(e.target.value) }} placeholder="Location" />
                        <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-primary text-black rounded-lg w-full">Create New Post</button>
                    </form>
                </> : ''
            }
        </Main>
    )
}
export default AddNewPost;