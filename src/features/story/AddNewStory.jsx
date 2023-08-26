import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header"
import Main from "../../components/Main"
import useAuthData from "../../hooks/useAuthData"
import { useNavigate } from "react-router-dom";
import { LuImagePlus } from 'react-icons/lu'
import { RiImageEditFill } from 'react-icons/ri'
import { MdClose } from 'react-icons/md'
import { useAddNewStoryMutation } from "./storyApiSlice";
import { useDispatch } from "react-redux";
import { addNewStory } from "./storySlice";
import LoadingSreen from '../../screens/loading/LoadingScreen'

const AddNewStory = () => {
    const { username } = useAuthData();
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    useEffect(() => {
        inputRef.current?.click();
    }, [])
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
    if(isLoading) return <LoadingSreen />
     return (
        <Main className={'relative'}>
            <input ref={inputRef} onChange={handleImage} type="file" name="file" id="" hidden={true} />
            {

                !url && <>
                    <Header title="Add to Story" />
                    <section className="rounded-lg pt-8 pb-2  bg-dark-sec flex flex-col items-center justify-center gap-8 relative top-[50%] -translate-y-[50%]">
                        <LuImagePlus size={100} className="dark:bg-dark p-4 rounded-xl shadow-lg box-content" />
                        <div className="w-full flex gap-2 p-4">
                            <button onClick={() => { inputRef.current?.click() }} className="text-xl px-4 py-2 rounded-md bg-blue-500 w-full">Select image</button>
                            <button onClick={() => { navigate('/') }} className="text-xl text-blue-400 px-4 py-2 rounded-md border-2 border-blue-500 w-full">Cancel</button>
                        </div>
                    </section>
                </>
            }
            {
                url && <>
                    <section className="dark:bg-dark-sec h-screen w-screen flex flex-col absolute left-0 top-0" style={{ backgroundImage: `url(${url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} >

                        <section className=" absolute top-0 left-0 p-2 flex gap-2">
                            <button onClick={() => { navigate('/') }} className="w-8 h-8 p-3  text-3xl bg-[rgba(0,0,0,0.3)] rounded-full text-white box-content">
                                <MdClose />
                            </button>
                            <button onClick={() => { inputRef.current?.click() }} className=" p-3 w-8 h-8 text-3xl box-content bg-[rgba(0,0,0,0.3)] rounded-full text-white">
                                <RiImageEditFill />
                            </button>
                        </section>

                        <button onClick={handleSubmit} className="px-4 py-2 rounded-lg w-full text-xl font-bold bg-[rgba(0,0,0,0.2)] text-white absolute bottom-2">Add to Your Story</button>
                    </section>
                </>
            }
        </Main>
    )
}
export default AddNewStory