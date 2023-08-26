import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name:'chat',
    initialState:{
       unreaded:[]
    },
    reducers:{
        setUnreadedMessages:(state, action)=>{
            state.unreaded = action.payload;
        },
        addUnreadedMessage:(state, action)=>{
            state.unreaded.push(action.payload);
        },
        emptyUnreadedMessages:(state)=>{
               state.unreaded = [];
        }
    }
});

export const selectUnreadedMessages = state => state.chat.unreaded;

export const {setUnreadedMessages, addUnreadedMessage, emptyUnreadedMessages} = chatSlice.actions;
