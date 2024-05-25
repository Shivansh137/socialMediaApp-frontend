const LogoutLoading = () => {
  return (
    <section className="absolute text-center grid gap-2 place-content-center z-10 w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.6)] text-white">
    <div className="ring-spin"><div></div><div></div><div></div><div></div></div>
    <p className="text-lg">Logging Out...</p>
  </section>
  )
}
export default LogoutLoading