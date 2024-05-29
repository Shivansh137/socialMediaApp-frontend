import { apiSlice } from '../api/apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // GET ALL USERS 
    getAllUsers: builder.query({
      query: () => '/users',
      providesTags: () => [{ type: "User", id: "LIST" }]
    }),
    // GET USER BY USERNAME
    getUserByUsername: builder.query({
      query: username => `/users/${username}`,
      providesTags: (result, err, arg) => {
        return [{ type: "User", id: arg }]
      }
    }),
    // GET PROFILE PIC BY USERNAME
    getProfilePic: builder.query({
      query: username => `/users/profilePic/${username}`,
      keepUnusedDataFor: 600,
      providesTags: () => [{ type: 'User', id: "PROFILE_PIC" }]

    }),
    // CREATE NEW USER
    addUser: builder.mutation({
      query: formData => ({
        url: "/users",
        method: "POST",
        body: formData
      }),
      invalidatesTags: () => [{ type: "User", id: "LIST" }]
    }),
    // UPDATE USER 
    updateUser: builder.mutation({
      query: body => ({
        url: `/users/${body.username}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: (result, err, args) => {
        return [{ type: 'User', id: args.username }, { type: 'User', id: 'PROFILE_PIC' }]
      }
    }),
    // change password
    changePassword: builder.mutation({
      query: body => ({
        url: `/users/change_password`,
        method: 'PATCH',
        body
      })
    }),
    // TOGGLE FOLLOW AND UNFOLLOW
    toggleFollow: builder.mutation({
      query: body => ({
        url: `/users/follow`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: (result, err, arg) => {
        return [{ type: 'User', id: arg.followerUsername }, { type: 'User', id: arg.followingUsername }]
      }
    }),
    // GET FOLLOWERS DATA BY USERNAME
    getFollowersData: builder.query({
      query: username => ({
        url: `/users/followers/${username}`,
        method: 'GET'
      }),
      providesTags: (result, err, arg) => {
        return [{ type: "User", id: arg }]
      }
    }),
    // GET FOLLOWING DATA BY USERNAME
    getFollowingData: builder.query({
      query: username => ({
        url: `/users/following/${username}`,
        method: 'GET'
      }),
      providesTags: (result, err, args) => {
        return [{ type: 'User', id: args }]
      }
    }),
    // SEARCH USERS
    searchUser: builder.mutation({
      query: reg => ({
        url: `/users/search/${reg}`,
        method: 'GET',
      }),
    }),
    // GET UNREADED MESSAGES
    getUnreadedMessages: builder.query({
      query: username => `/chats/messages/unreaded/${username}`,
      providesTags: [{ type: 'Chat', id: 'UNREADED' }]
    }),
    // MARK UNREADED MESSAGES AS READED
    readUnreadedMessages: builder.mutation({
      query: body => ({
        url: '/chats/messages/unreaded',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Chat', id: 'UNREADED' }]
    }),
    // GET ALL UNREADED NOTIFICATIONS
    getAllNotifications: builder.query({
      query: username => `/users/notifications/${username}`
    }),
    // ADD A NOTIFICATION
    addNotification: builder.mutation({
      query: ({ username, ...body }) => ({
        url: `/users/notifications/${username}`,
        method: 'POST',
        body
      })
    }),
    // CLEAR ALL NOTIFICATIONS
    clearNotifications: builder.mutation({
      query: username => ({
        url: `/users/notifications/${username}`,
        method: 'DELETE'
      })
    })
  })
});

export const selectUserData = (state, username) => {
  const { data } = usersApiSlice.endpoints.getUserByUsername.select(username)(state);
  return data;
}

export const {
  useGetAllUsersQuery,
  useGetUserByUsernameQuery,
  useGetProfilePicQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useToggleFollowMutation,
  useGetFollowersDataQuery,
  useGetFollowingDataQuery,
  useSearchUserMutation,
  useGetUnreadedMessagesQuery,
  useReadUnreadedMessagesMutation,
  useGetAllNotificationsQuery,
  useAddNotificationMutation,
  useClearNotificationsMutation
} = usersApiSlice;