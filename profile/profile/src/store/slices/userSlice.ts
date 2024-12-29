import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../../store/store';

const userSlice = createSlice({
    name:"user",
    initialState:{
        loading:false,
        user:{},
        isAuthenticated:false,
        error:null,
        message:null,
    },
    reducers:{
        loadUserRequest(state){
            state.loading = true;
            state.isAuthenticated=false;
            state.user={};
            state.error=null;
        },
        loadUserSuccess(state,action){
            state.loading = false;
            state.isAuthenticated=true;
            state.user=action.payload;
            state.error=null;
        },
        loadUserFailed(state,action){
            state.loading = false;
            state.isAuthenticated=false;
            state.user={};
            state.error=action.payload;
        },
        resetProfileAfterUpdate(state){
            state.error = null;
            state.message=null;
        },
        clearAllErrors(state){
            state.error = null;
            state.user = state.user;
        }
    }
})

export const getUser = () => async(dispatch:AppDispatch)=>{
    dispatch(userSlice.actions.loadUserRequest());
    try {
        const {data} = await axios.get("https://portfolio-13of.onrender.com/api/v1/user/me/portfolio",{withCredentials:true});
        dispatch(userSlice.actions.loadUserSuccess(data.user));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error:any) {
        dispatch(userSlice.actions.loadUserFailed(error.response.data.message))
    }
}

export const resetProfile = ()=>(dispatch:AppDispatch)=>{
    dispatch(userSlice.actions.resetProfileAfterUpdate());
}

export const clearAllUserErrors = ()=>(dispatch:AppDispatch)=>{
    dispatch(userSlice.actions.clearAllErrors());
}

export default userSlice.reducer;