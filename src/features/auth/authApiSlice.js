import { apiSlice } from '../api/apiSlice'
import { emptyUnreadedMessages } from '../chat/chatSlice';
import { clearToken, setToken } from './authSlice';
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: `/auth/login`,
                method: "POST",
                body: credentials
            })
        }),
        refresh: builder.mutation({
            query: () => '/auth/refresh',
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const response = await queryFulfilled;
                dispatch(setToken(response?.data?.accessToken));
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(clearToken());
                dispatch(apiSlice.util.resetApiState());
                dispatch(emptyUnreadedMessages());
            }
        })
    })
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } = authApiSlice