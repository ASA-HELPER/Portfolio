import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from '../../store/store';

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    sendMessageRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    sendMessageSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    sendMessageFailed(state, action) {
      state.message = state.message;
      state.error = action.payload;
      state.loading = false;
    },
    resetMessageSlice(state) {
      state.error = null;
      state.message = state.message;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state.message = state.message;
    },
  },
});

export const sendMessage = (senderName:string,subject:string,message:string) => async (dispatch:AppDispatch) => {
  dispatch(messageSlice.actions.sendMessageRequest());
  try {
    const response = await axios.post(
      "https://portfolio-13of.onrender.com/api/v1/message/send",
      { senderName, subject, message },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(
      messageSlice.actions.sendMessageSuccess(response.data.message)
    );
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error:any) {
    dispatch(
      messageSlice.actions.sendMessageFailed(error.response.data.message)
    );
  }
};

export const clearAllMessageErrors = () => (dispatch:AppDispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

export const resetMessagesSlice = () => (dispatch:AppDispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;