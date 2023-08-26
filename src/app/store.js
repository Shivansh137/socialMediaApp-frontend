import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import { apiSlice } from "../features/api/apiSlice";
import { chatSlice } from "../features/chat/chatSlice";
import { storySlice } from "../features/story/storySlice";
import { notificationsSlice } from "../features/notification/notificationsSlice";

export const store = configureStore({
   reducer:{
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authSlice.reducer,
      chat:chatSlice.reducer,
      story:storySlice.reducer,
      notifications:notificationsSlice.reducer
   },
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});
