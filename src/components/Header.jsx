import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom"

const Header = ({title}) => {
  const navigate = useNavigate();

  return (
    <header className="p-4 flex items-center gap-4 sticky top-0 dark:bg-dark shadow-sm dark:text-white md:hidden">
        <MdArrowBack onClick={()=>{navigate(-1)}} size={25}/>
        <p className="text-lg">{title}</p>
    </header>
  )
}
export default Header