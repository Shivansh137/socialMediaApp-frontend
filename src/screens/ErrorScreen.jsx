import { MdError } from "react-icons/md"

const ErrorScreen = ({ error }) => {
  return (
    <section className="absolute grid place-content-center z-10 w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,.5)]">
      <article className="bg-slate-100 dark:bg-dark-sec px-16 py-8 rounded-md flex flex-col items-center gap-4">
        <MdError color="red" size={60} />
        <p>{navigator.onLine ? (error?.data?.message ? error.data.message : JSON.stringify(error)) : 'You are Offline'}</p>
      </article>
    </section>
  )
}
export default ErrorScreen