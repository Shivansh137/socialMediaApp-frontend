import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:8000',
   baseUrl: 'https://socialmediaappapi.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers;
    }
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403) {
        const refresh = await baseQuery('/refresh', api, extraOptions);
        if (refresh?.data) {
            api.dispatch(setToken(refresh?.data?.accessToken));
            result = await baseQuery(args, api, extraOptions);
        }
        else {
            if (refresh?.error?.status === 401) {
                refresh.error.data.message = 'Your login has expired'
                api.dispatch(clearToken())
            }
            return refresh;
        }
    }
    return result
}
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Post', 'Chat'],
    endpoints: builder => ({})
});