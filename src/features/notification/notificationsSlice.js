import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
    name: 'notification',
    initialState:{
        notifications:[]
    },
    reducers:{
       addNotification(state, action){
           state.notifications.push(action.payload);
       },
       setNotifications(state, action){
            state.notifications = action.payload;
       },
       clearNotifications(state){
          state.notifications = [];
       }
    }
});

export const selectAllNotifications = state => state.notifications.notifications;
export const {addNotification,setNotifications, clearNotifications} = notificationsSlice.actions;