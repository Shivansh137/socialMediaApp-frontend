import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header"
import Main from "../../components/Main"
import useAuthData from "../../hooks/useAuthData"
import { useNavigate } from "react-router-dom";
import { RiImageEditFill } from 'react-icons/ri'
import { MdClose, MdUploadFile } from 'react-icons/md'
import { useAddNewStoryMutation } from "./storyApiSlice";
import { useDispatch } from "react-redux";
import { addNewStory } from "./storySlice";
import LoadingSreen from '../../screens/LoadingScreen'

const AddNewStory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { username } = useAuthData();
    const inputRef = useRef(null);
    const [file, setFile] = useState(new Blob());
    const [url, setBase64] = useState('');
    const [addStory, { isLoading, isSuccess }] = useAddNewStoryMutation();

    const handleImage = (e) => {
        setFile(e.target.files[0])
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setBase64(reader.result);
        }
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('file', file);
        try {
            const res = await addStory(formData).unwrap();
            dispatch(addNewStory(res));
            navigate('/');
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
            <input ref={inputRef} onChange={handleImage} type="file" accept="image/png, image/jpeg" name="file" id="" hidden={true} />
            {
                !url && <>

                    <Header title="Add New Story" />
                    <section className="rounded-lg absolute w-full top-[50%] -translate-y-[50%] bg-gray-50 dark:bg-dark-sec py-4 flex flex-col items-center gap-4 ">
                        <section className="p-4">
                            <MdUploadFile size={50} className="mx-auto my-4" />
                            No image selected
                        </section>
                        <div className="w-full flex flex-col gap-2 p-4">
                            <button onClick={() => { inputRef.current?.click() }} className=" py-2 rounded-md bg-sky-400 text-white dark:bg-blue-600 w-full text-sm">Select image</button>
                            <button onClick={() => { navigate('/') }} className=" text-sm text-blue-400 py-2 rounded-md border-2 border-blue-500 w-full">Cancel</button>
                        </div>
                    </section>
                </>
            }
            {
                url && <>
                    <section className="dark:bg-dark-sec h-screen w-screen flex flex-col absolute left-0 top-0" style={{ backgroundImage: `url(${url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} >

                        <section className=" absolute top-0 left-0 p-2 flex gap-2">
                            <button onClick={() => { navigate('/') }} className="w-10 h-10 text-2xl bg-[rgba(0,0,0,0.5)] rounded-full text-white box-content">
                                <MdClose className="inline" />
                            </button>
                            <button onClick={() => { inputRef.current?.click() }} className=" w-10 h-10 text-2xl box-content bg-[rgba(0,0,0,0.5)] rounded-full text-white">
                                <RiImageEditFill className="inline" />
                            </button>
                        </section>

                        <button onClick={handleSubmit} className="px-4 py-2  w-full text-lg font-bold bg-[rgba(0,0,0,0.5)] text-white absolute bottom-0">Add to Your Story</button>
                    </section>
                </>
            }
        </Main>
    )
}
export default AddNewStory