import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        unreaded: [],
        onlineUsers: [],
        typingUsers: {}
    },
    reducers: {
        addUserMessages: (state, action) => {
            state.messages.push(action.payload);
        },
        setUnreadedMessages: (state, action) => {
            state.unreaded = action.payload;
        },
        addUnreadedMessage: (state, action) => {
            state.unreaded.push(action.payload);
        },
        removeUnreadedMessages: (state, action) => {
            state.unreaded = state.unreaded.filter(msg => msg.sender != action.payload)
        },
        emptyUnreadedMessages: (state) => {
            state.unreaded = [];
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        addTypingUser: (state, action) => {
            state.typingUsers = { ...state.typingUsers, [action.payload]: true };
        },
        removeTypingUser: (state, action) => {
            state.typingUsers = { ...state.typingUsers, [action.payload]: false };
        }
    }
});

export const selectUnreadedMessages = state => state.chat.unreaded;
export const selectOnlineUsers = state => state.chat.onlineUsers;
export const selectTypingUsers = state => state.chat.typingUsers;

export const {
    setUnreadedMessages, addUnreadedMessage,
    emptyUnreadedMessages,
    removeUnreadedMessages, setOnlineUsers,
    addTypingUser, removeTypingUser
} = chatSlice.actions;
