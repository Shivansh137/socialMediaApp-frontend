const Main = ({children, className}) => {
  return (
     <main className={`grow overflow-x-hidden overflow-y-scroll px-2 md:p-4 max-w-2xl  ${className}`}>
       {children}
     </main>
  )
}
export default Main