import StoryCircle from "./StoryCircle"
import { useSelector } from "react-redux";
import { selectAllUsernames } from "./storySlice";
import MyStoryCircle from "./MyStoryCircle";

const StoriesContainer = () => {
  const usernames = useSelector(selectAllUsernames);
  return (
    <ul style={{scrollBehavior:'smooth'}} className=" dark:bg-dark-sec p-3 space-x-4 my-2 whitespace-nowrap shadow-sm  sm:dark:shadow-lg sm:border-6  overflow-x-scroll md:hidden">
      <MyStoryCircle />

      {
        usernames?.map((username, index) => <StoryCircle key={username} username={username} index={index} />)
      }
     
    </ul>
  )
}
export default StoriesContainer