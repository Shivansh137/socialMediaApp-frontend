const TextInput = ({placeholder,value, onChange, className }) => {
  return (
      <input className={`px-4 py-3 w-full rounded-lg bg-light dark:bg-dark-sec dark:text-gray-100 ${className}`} type="text" placeholder={placeholder} value={value} onChange={onChange}/>
  )
}
export default TextInput