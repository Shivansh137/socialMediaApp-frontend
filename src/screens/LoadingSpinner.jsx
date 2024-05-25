const LoadingSpinner = () => {
  return (
   <section className="absolute grid place-content-center z-10 w-screen h-screen md:w-full  top-0 left-0 bg-[rgba(0,0,0,0.2)] ">
     <div className="ring-spin "><div></div><div></div><div></div><div></div></div>
   </section>
  )
}
export default LoadingSpinner