const Notification = ({username, message, time}) => {
  return (
    <li className='p-4 bg-dark-sec mb-1'>
     <p>     <span className="text-blue-500">{username}</span> {message}</p>
        </li>
  )
}
export default Notification