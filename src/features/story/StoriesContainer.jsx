import StoryCircle from "./StoryCircle"
import { useSelector } from "react-redux";
import { selectAllUsernames } from "./storySlice";
import MyStoryCircle from "./MyStoryCircle";

const StoriesContainer = () => {
  const usernames = useSelector(selectAllUsernames);
  return (
    <ul style={{scrollBehavior:'smooth'}} className=" dark:bg-dark-sec rounded-t-lg w-full items-center p-4 sm:p-4 space-x-4 my-4 whitespace-nowrap shadow-md dark:shadow-sm sm:dark:shadow-lg border-2 sm:border-6 dark:border-dark overflow-x-scroll md:hidden">
      <MyStoryCircle />

      {
        usernames?.map((username, index) => <StoryCircle key={username} username={username} index={index} />)
      }
     
    </ul>
  )
}
export default StoriesContainer