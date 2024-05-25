import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom"

const Header = ({title, className}) => {
  const navigate = useNavigate();

  return (
    <header className="p-4 flex items-center gap-2 sticky top-0 dark:bg-dark-sec shadow-sm dark:text-white md:hidden">
        <MdArrowBack onClick={()=>{navigate(-1)}} size={25}/>
        <p>{title}</p>
    </header>
  )
}
export default Header