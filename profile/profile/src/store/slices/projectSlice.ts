import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../../store/store";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
    singleProject: {},
  },
  reducers: {
    getAllProjectsRequest(state) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectsFailed(state, action) {
      state.projects = state.projects;
      state.error = action.payload;
      state.loading = false;
    },
    getSingleProjectRequest(state) {
      state.singleProject = {};
      state.error = null;
      state.loading = true;
    },
    getSingleProjectSuccess(state, action) {
      state.singleProject = action.payload;
      state.error = null;
      state.loading = false;
    },
    getSingleProjectFailed(state, action) {
      state.singleProject = state.singleProject;
      state.error = action.payload;
      state.loading = false;
    },
    resetProjectSlice(state) {
      state.error = null;
      state.projects = state.projects;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state.projects = state.projects;
    },
  },
});

export const getAllProjects = () => async (dispatch:AppDispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const response = await axios.get(
      "https://portfolio-13of.onrender.com/api/v1/project/getall",
      { withCredentials: true }
    );
    dispatch(
      projectSlice.actions.getAllProjectsSuccess(response.data.projects)
    );
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error:any) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(error.response.data.message)
    );
  }
};

export const getSingleProject = (id:string) => async (dispatch:AppDispatch) => {
  dispatch(projectSlice.actions.getSingleProjectRequest());
  try {
    const response = await axios.get(
      `https://portfolio-13of.onrender.com/api/v1/project/get/${id}`,
      { withCredentials: true }
    );
    dispatch(
      projectSlice.actions.getSingleProjectSuccess(response.data.project)
    );
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error:any) {
    dispatch(
      projectSlice.actions.getSingleProjectFailed(error.response.data.message)
    );
  }
};

export const resetProjectSlice = () => (dispatch:AppDispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export const clearAllProjectErrors = () => (dispatch:AppDispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;