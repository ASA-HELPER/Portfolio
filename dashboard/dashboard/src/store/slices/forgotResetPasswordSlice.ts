import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from 'store/store';

const forgotResetPasswordSlice = createSlice({
    name:"forgotPassword",
    initialState:{
        loading:false,
        error:null,
        message:null,
    },
    reducers:{
        forgotPasswordRequest(state){
            state.loading = true;
            state.error=null;
            state.message=null;
        },
        forgotPasswordSuccess(state,action){
            state.loading = false;
            state.error=null;
            state.message=action.payload;
        },
        forgotPasswordFailed(state,action){
            state.loading = false;
            state.error=action.payload;
            state.message=null;
        },
        resetPasswordRequest(state){
            state.loading = true;
            state.error=null;
            state.message=null;
        },
        resetPasswordSuccess(state,action){
            state.loading = false;
            state.error=null;
            state.message=action.payload;
        },
        resetPasswordFailed(state,action){
            state.loading = false;
            state.error=action.payload;
            state.message=null;
        },
        clearAllErrors(state){
            state.error = null;
            state = state;
        }
    }
})

export const forgotPassword = (email: string) => async(dispatch:AppDispatch)=>{
    dispatch(forgotResetPasswordSlice.actions.forgotPasswordRequest());
    try {
        const {data} = await axios.post("http://localhost:8000/api/v1/user/password/forgot",{email},{withCredentials:true,headers:{"Content-Type":"application/json"}})
        dispatch(forgotResetPasswordSlice.actions.forgotPasswordSuccess(data.message));
        dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
    } catch (error:any) {
        dispatch(forgotResetPasswordSlice.actions.forgotPasswordFailed(error.response.data.message));
    }
}

export const resetPassword = (resetToken:string,password:string,confirmPassword:string) => async(dispatch:AppDispatch)=>{
    dispatch(forgotResetPasswordSlice.actions.resetPasswordRequest());
    try {
        const {data} = await axios.put(`http://localhost:8000/api/v1/user/password/reset/${resetToken}`,{password,confirmPassword},{withCredentials:true,headers:{"Content-Type":"application/json"}})
        dispatch(forgotResetPasswordSlice.actions.resetPasswordSuccess(data.message));
        dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
    } catch (error:any) {
        dispatch(forgotResetPasswordSlice.actions.resetPasswordFailed(error.response.data.message));
    }
}

export const clearAllForgotPasswordErrors = ()=>(dispatch:AppDispatch)=>{
    dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
}

export default forgotResetPasswordSlice.reducer;