const Main = ({ children, className }) => {
  return (
    <main className={`grow text-sm overflow-x-hidden overflow-y-scroll max-w-2xl  ${className}`}>
      {children}
    </main>
  )
}
export default Main