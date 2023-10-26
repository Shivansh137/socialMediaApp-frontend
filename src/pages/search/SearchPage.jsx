import { MdClose, MdSearch } from "react-icons/md";
import { useGetAllUsersQuery, useSearchUserMutation } from "../../features/user/usersApiSlice"
import ErrorScreen from "../../screens/error/ErrorScreen";
import LoadingSreen from "../../screens/loading/LoadingScreen";
import UserList from "../../features/user/UserList";
import { useEffect, useState } from "react";
import { BiChat, BiSearch, BiSolidChat } from "react-icons/bi"
import BottomNavigation from "../../components/BottomNavigation";
import TextInput from '../../components/TextInput'
import Main from '../../components/Main'
import Aside from "../../components/Aside";

const SearchPage = () => {
  const { data: users, isLoading,isSuccess, isError, error } = useGetAllUsersQuery();
  const [searchInput, setSearchInput] = useState('')
  const [searchUser, { isLoading: loadingUsers, isFetching }] = useSearchUserMutation();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = async () => {
    if (searchInput) {
      try {
        const result = await searchUser(searchInput).unwrap();
        setSearchResult(result)
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    handleSearch();
  }, [searchInput])

 
  if (isError) return <ErrorScreen error={error} />
  return (
    <>
      <Main>
        <section onFocus={() => { setShowSearchResults(true) }} className=" border-2 dark:border-dark shadow-sm rounded-lg pr-4 mx-2 my-4 flex dark:bg-dark-sec">
          <input className="p-4 grow bg-transparent" onChange={handleSearchInput} value={searchInput} placeholder="Search..." />
          <button className="text-2xl  rounded-full" onClick={() => { setShowSearchResults(false); setSearchInput('') }}>
            {
              showSearchResults ? <MdClose /> : <BiSearch />
            }
          </button>
        </section>
        {
          showSearchResults ?
            (loadingUsers || isFetching ?
              <LoadingSreen /> :
              (searchResult.length ?
                <UserList users={searchResult || []} /> :
                (searchInput ?
                  <article className=" flex flex-col gap-4 items-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                    <p className="text-6xl">🍃</p>
                    <p>No result found</p>
                  </article> :
                  <article className=" flex flex-col gap-4 items-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full">
                    <p className="text-6xl">🔍</p>
                    <p>Search by name or username...</p>
                  </article>
                ))
            ) :
            <>
              <p className="px-4 pb-2 text-sm text-gray-600 dark:text-gray-300">People you might know</p>
              {
               isLoading && <LoadingSreen/>
              }
              {
               isSuccess && <UserList users={users} />
              }
            </>
        }
      </Main>
      <BottomNavigation />
    </>

  )
}
export default SearchPage