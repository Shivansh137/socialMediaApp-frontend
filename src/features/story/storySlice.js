import { createSelector, createSlice } from "@reduxjs/toolkit";

export const storySlice = createSlice({
    name:'story',
    initialState:{
        stories:{},
        mystories:[]
    },
    reducers:{
        setAllStories(state,action){
            state.stories = action.payload
        },
        setMyStories(state,action){
            state.mystories = action.payload;
        },
        addNewStory(state, action){
             state.mystories.push(action.payload);
        }
    }
});

export const {setAllStories, setMyStories, addNewStory} = storySlice.actions;

export const selectAllUsernames = createSelector(
    state => state.story.stories,
    stories => Object.keys({...stories})
)

export const selectMyStories = state => state.story.mystories;
export const selectAllStories = state => state.story.stories