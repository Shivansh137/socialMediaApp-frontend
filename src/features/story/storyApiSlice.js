import {apiSlice} from '../api/apiSlice'
import { setAllStories } from './storySlice';
export const storyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewStory : builder.mutation({
            query: body => ({
                 url:'/stories',
                 method:'POST',
                 body
            })
        }),
        getAllStories: builder.query({
            query: username => `/stories/${username}`
            
        }),
        getUserStoriesByUsername: builder.query({
            query: username => `/stories/mystories/${username}`
        })
    })
});

export const {useGetUserStoriesByUsernameQuery,useGetAllStoriesQuery, useAddNewStoryMutation} = storyApiSlice;