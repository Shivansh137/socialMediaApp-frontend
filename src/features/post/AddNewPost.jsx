import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header"
import Main from "../../components/Main"
import useAuthData from "../../hooks/useAuthData"
import { useNavigate } from "react-router-dom";
import { LuImagePlus } from 'react-icons/lu'
import { RiImageEditFill } from 'react-icons/ri'
import { MdClose, MdDelete } from 'react-icons/md'
import { useDispatch } from "react-redux";
import LoadingSreen from '../../screens/loading/LoadingScreen'
import Carousel from "./Carousel";
import CarouselImage from "./CarouselImage";
import TextInput from "../../components/TextInput";
import { useAddPostMutation } from "./postsApiSlice";


const AddNewPost = () => {
    const { username } = useAuthData();
    const inputRef = useRef(null);
    const addMoreInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const [base64s, setBase64s] = useState([]);
    const [ratio, setRatio] = useState('1/1');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [addPost, { isLoading, isSuccess }] = useAddPostMutation();

    const handleImage = (e) => {
        setFiles(e.target.files);
        for(var i = 0; i<e.target?.files?.length; i++){
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[i]);
            reader.onload = () => {
                setBase64s(i => [...i,reader.result]);
            }
        }      
    }
    const handleAddMoreFiles = (e) => {
        setFiles(files => [...files,...e.target.files]);
        for(var i = 0; i<e.target?.files?.length; i++){
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[i]);
            reader.onload = () => {
                setBase64s(i => [...i,reader.result]);
            }
        }      
    }
    const handleDeleteImage = (i)=>{
        setBase64s(e => {
           let copy = [...e];
           copy.splice(i,1);
           return copy;
           })
        setFiles(e => {
           let copy = [...e];
           copy.splice(i,1);
           return copy;
           })
       
    }
    useEffect(() => {
        inputRef.current?.click();
    }, [])
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('title', title);
        formData.append('location', location);
        formData.append('ratio', ratio);
        for(let  i =0; i<files?.length ; i++){
            formData.append('postFiles', files[i]);
        }
        try {
           const res = await addPost(formData).unwrap();
       
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    if(isLoading) return <LoadingSreen />
    return (
        <Main className={'relative'}>
          
            
            <input ref={inputRef} onChange={handleImage} type="file" multiple={true} name="file" id="" hidden={true} />
            <input ref={addMoreInputRef} onChange={handleAddMoreFiles} type="file" multiple={true} name="addfile" id="" hidden={true} />
            {

                !base64s?.length && <>
                    <Header title="Create New Post" />
                    <section className="rounded-lg pt-8 pb-2  bg-gray-50 dark:bg-dark flex flex-col items-center justify-center gap-8 ">
                        <LuImagePlus size={100} className="dark:bg-dark bg-white text-gray-800 p-4 rounded-xl shadow-lg box-content" />
                        <div className="w-full flex flex-col gap-4 p-4">
                            <button onClick={() => { inputRef.current?.click() }} className="text-xl px-4 py-2 rounded-md bg-sky-400 text-white dark:bg-blue-600 w-full">Select images</button>
                            <button onClick={() => { navigate('/') }} className="text-xl text-blue-400 px-4 py-2 rounded-md border-2 border-blue-500 w-full">Cancel</button>
                        </div>
                    </section>
                </>
            }
            {
             base64s?.length ? <>
           <section className="flex p-4 rounded-md">
                  <button onClick={()=>{setRatio('1/1')}}  className={` w-12 aspect-square rounded-l-md transition-[background-color] delay-50 ${ratio === '1/1' ? 'bg-sky-500 text-white':' bg-gray-100 dark:bg-dark-sec'}`} type="button">
                    1 : 1
                  </button>
                  <button onClick={()=>{setRatio('4/5')}} className={` w-12 aspect-square rounded-r-md transition-[background-color] delay-50  ${ratio !== '1/1' ? 'bg-sky-400 text-white':'bg-gray-100 dark:bg-dark-sec'}`} type="button">
                    4 : 5
                  </button>
                  <button onClick={()=>{navigate('/')}} className="ml-auto">Cancel</button>
                </section>
           
                    <ul className={` py-2 rounded-lg aspect-[${ratio}] overflow-y-hidden space-x-2 whitespace-nowrap`}>
                   {
                    base64s?.map((base64,i) =><li className={`w-full aspect-[${ratio}] bg-no-repeat bg-cover inline-block relative`} style={{backgroundImage:`url(${base64})`, paddingTop:`${ratio?.charAt(2)/ratio?.charAt(0)*100+'%'}`}}>
                       <section className="flex w-full justify-between">
                       <MdDelete className="text-white bg-[rgba(0,0,0,0.5)] box-content p-2 rounded-full m-2 text-xl" onClick={()=>{handleDeleteImage(i)}} />
                        <span className="text-white bg-[rgba(0,0,0,0.5)] box-content p-2 rounded-md m-2   ">{i+1}/{base64s?.length}</span>
                       </section>
                    </li>)
                   }
                   </ul>
               <button onClick={()=>{addMoreInputRef.current?.click()}} className="px-4 py-2 border-sky-300 border-2 rounded-lg w-full my-4 text-sky-500">Add More + </button>
                <form className="flex flex-col gap-4 my-4">
               
                    <TextInput value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Title" />
                    <TextInput value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder="Location" />
                    <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-sky-500 dark:bg-blue-600 text-white rounded-lg w-full">Create New Post</button>
                </form>
                </> : ''
            }
        </Main>
    )
}
export default AddNewPost;