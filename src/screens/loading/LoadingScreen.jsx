const LoadingSreen = () => {
  return (
    <section className="relative grid place-content-center z-10  top-[50%] left-[50%] -translate-x-[50%]  -translate-y-[50%]">
       <article className=" px-16 py-8 rounded-md flex flex-col items-center gap-4">
          <div className="ring-spin "><div></div><div></div><div></div><div></div></div>
        
<p>Please wait <br/> Server is running slower...</p>
          </article>
        </section>
  )
}
export default LoadingSreen