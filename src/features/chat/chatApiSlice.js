import { apiSlice } from "../api/apiSlice";

export const chatsApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      getChatUsers: builder.query({
         query: username => `/chats/users/${username}`,
         providesTags: [{ type: 'Chat', id: 'USERLIST' }]
      }),
      getAllMessages: builder.mutation({
         query: body => ({
            url: '/chats/messages',
            method: 'POST',
            body
         }),
      }),
      addNewMessage: builder.mutation({
         query: body => ({
            url: '/chats',
            method: 'POST',
            body
         })
      }),
      getUnreadedMessages: builder.query({
         query: username => `/chats/messages/unreaded/${username}`,
         providesTags:[{type:'Chat',id:'UNREADED'}]
      }),
      readUnreadedMessagesOfOneUser: builder.mutation({
         query: body => ({
            url: '/chats/messages/unreaded',
            method: 'POST',
            body
         }),
         invalidatesTags:[{type:'Chat',id:'UNREADED'}]
      })
   })
});

export const {
   useGetAllMessagesMutation,
   useAddNewMessageMutation,
   useGetChatUsersQuery,
   useGetUnreadedMessagesQuery,
   useReadUnreadedMessagesOfOneUserMutation
} = chatsApiSlice;