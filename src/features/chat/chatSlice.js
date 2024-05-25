import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name:'chat',
    initialState:{
       unreaded:[],
       onlineUsers: []
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
        },
        setOnlineUsers:(state, action)=>{
            state.onlineUsers = action.payload;
        }
    }
});

export const selectUnreadedMessages = state => state.chat.unreaded;
export const selectOnlineUsers = state => state.chat.onlineUsers;

export const {setUnreadedMessages, addUnreadedMessage, emptyUnreadedMessages, setOnlineUsers} = chatSlice.actions;
