import { MdAccountCircle } from "react-icons/md"

const ProfilePicCircle = ({src, className}) => {
 if(src) return (
   <div style={{backgroundImage:`url(https://res.cloudinary.com/dofd4iarg/image/upload/v1690608655/${src}.png)`}} className={`${className} box-content rounded-full bg-cover bg-no-repeat bg-transparent`}></div>
  )
  else return (
        <MdAccountCircle className={`text-slate-300  ${className}`} />
  )
}
export default ProfilePicCircle