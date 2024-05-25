import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import { useGetFollowersDataQuery } from "./usersApiSlice";
import UserList from "./UserList";
import Main from '../../components/Main'
import LoadingSreen from "../../screens/LoadingScreen";
import ErrorScreen from "../../screens/ErrorScreen";
import useAuthData from "../../hooks/useAuthData";

const FollowersPage = () => {
  const { username } = useParams();
  const { username: myUsername } = useAuthData();
  const { data: followers, isLoading, isSuccess, isError, error } = useGetFollowersDataQuery(username || myUsername);

  return (
    <>
      <Header title={"Followers"} />
      <Main>
      <p className="hidden md:block p-4">Followers</p>

        {
          isLoading && <LoadingSreen />
        }
        {
          isError && <ErrorScreen error={error} />
        }
        {
          isSuccess ?
            followers?.length ?
              <UserList users={followers} /> :
              <section className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col gap-4">
                <p className="text-6xl">🍃</p>
                <p className="font-bold">No followers</p>
              </section> :
            ''
        }
      </Main>
    </>
  )
}
export default FollowersPage