import { Route, Routes } from "react-router-dom"
import Register from "./features/auth/Register"
import ProfilePage from "./features/user/ProfilePage"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import ChatPage from "./features/chat/ChatPage"
import LoginPage from "./features/auth/LoginPage"
import MyProfilePage from "./features/user/MyProfilePage"
import FollowersPage from "./features/user/FollowersPage"
import FollowingPage from "./features/user/FollowingPage"
import Prefetch from "./features/auth/Prefetch"
import SingleChatPage from "./features/chat/SingleChatPage"
import Persist from "./features/auth/Persist"
import EditProfilePage from "./features/user/EditProfilePage"
import StoryPage from "./features/story/StoryPage"
import NotificationsPage from "./features/notification/NotificationsPage"
import AddNewStory from "./features/story/AddNewStory"
import MyStoryPage from "./features/story/MyStoryPage"
import AddNewPost from "./features/post/AddNewPost"
import CommentsPage from "./features/post/CommentsPage"
import MyPostViewer from "./features/user/MyPostViewer"

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<Persist />} >
        <Route element={<Prefetch />}>

          <Route index element={<HomePage />} />

          <Route path="posts">
            <Route path="add_post" element={<AddNewPost />} />
            <Route path=":id">
              <Route index element={<MyPostViewer />} />
              <Route path="comments" element={<CommentsPage />} />
            </Route>
          </Route>

          <Route path="search" element={<SearchPage />} />

          <Route path="chat">
            <Route index element={<ChatPage />} />
            <Route path=":username" element={<SingleChatPage />} />
          </Route>

          <Route path="profile" >
            <Route index element={<MyProfilePage />} />
            <Route path="followers" element={<FollowersPage />} />
            <Route path="following" element={<FollowingPage />} />
            <Route path="edit" element={<EditProfilePage />} />
          </Route>

          <Route path=":username">
            <Route index element={<ProfilePage />} />
            <Route path="followers" element={<FollowersPage />} />
            <Route path="following" element={<FollowingPage />} />
          </Route>

          <Route path="/notifications" element={<NotificationsPage />} />

          <Route path="stories/:index" element={<StoryPage />} />
          <Route path="stories/add_story" element={<AddNewStory />} />
          <Route path="stories/mystories" element={<MyStoryPage />} />

        </Route>
      </Route>

    </Routes >
  )
}

export default App
