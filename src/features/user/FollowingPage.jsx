import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import UserList from "./UserList";
import { useGetFollowingDataQuery } from "./usersApiSlice";
import LoadingScreen from "../../screens/LoadingScreen";
import useAuthData from "../../hooks/useAuthData";
import Main from '../../components/Main'

const FollowingPage = () => {
  const { username } = useParams();
  const { username: myUsername } = useAuthData();
  const { data: following, isLoading, isSuccess, isError, error } = useGetFollowingDataQuery(username || myUsername);

  return (
    <>
      <Header title={"Following"} />
      <Main>
        <p className="hidden md:block p-4">Following</p>
        {
          isLoading && <LoadingScreen />
        }
        {
          isError && <ErrorScreen error={error} />
        }
        {
          isSuccess ? following?.length ? <UserList users={following} /> :
            <section className="items-center absolute top-[50%] left-[50%] translate-x-[-50%] -translate-y-[50%] flex flex-col gap-4">
              <p className="text-6xl">🍃</p>
              <p className="font-bold">No following</p>
            </section> : ''
        }
      </Main>
    </>
  )
}
export default FollowingPage