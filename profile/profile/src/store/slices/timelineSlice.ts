import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../../store/store";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state) {
      state.timeline = [];
      state.error = null;
      state.loading = true;
    },
    getAllTimelineSuccess(state, action) {
      state.timeline = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllTimelineFailed(state, action) {
      state.timeline = state.timeline;
      state.error = action.payload;
      state.loading = false;
    },
    resetTimelineSlice(state) {
      state.error = null;
      state.timeline = state.timeline;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state.timeline = state.timeline;
    },
  },
});

export const getAllTimeline = () => async (dispatch:AppDispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/timeline/getall",
      { withCredentials: true }
    );
    dispatch(
      timelineSlice.actions.getAllTimelineSuccess(response.data.timelines)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error:any) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(error.response.data.message)
    );
  }
};

export const resetTimelineSlice = () => (dispatch:AppDispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

export const clearAllTimelineErrors = () => (dispatch:AppDispatch) => {
  dispatch(timelineSlice.actions.clearAllErrors());
};

export default timelineSlice.reducer;