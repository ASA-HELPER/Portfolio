import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import forgotResetPasswordReducer from './slices/forgotResetPasswordSlice';
import messagesReducer from './slices/messageSlice'
import timelineReducer from './slices/timelineSlice'
import skillReducer from './slices/skillSlice'
import softwareApplicationReducer from './slices/softwareApplicationSlice'
import projectReducer from './slices/projectSlice'

export const store = configureStore({
    reducer:{
        user:userReducer,
        forgotPassword:forgotResetPasswordReducer,
        messages:messagesReducer,
        timeline:timelineReducer,
        skill:skillReducer,
        application:softwareApplicationReducer,
        project:projectReducer
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
