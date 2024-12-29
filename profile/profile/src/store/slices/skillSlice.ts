import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../../store/store";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillsRequest(state) {
      state.skills = [];
      state.error = null;
      state.loading = true;
    },
    getAllSkillsSuccess(state, action) {
      state.skills = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllSkillsFailed(state, action) {
      state.skills = state.skills;
      state.error = action.payload;
      state.loading = false;
    },
    resetSkillSlice(state) {
      state.error = null;
      state.skills = state.skills;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state.skills = state.skills;
    },
  },
});

export const getAllSkills = () => async (dispatch:AppDispatch) => {
  dispatch(skillSlice.actions.getAllSkillsRequest());
  try {
    const response = await axios.get(
      "https://portfolio-13of.onrender.com/api/v1/skill/getall",
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.getAllSkillsSuccess(response.data.skills));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error:any) {
    dispatch(
      skillSlice.actions.getAllSkillsFailed(error.response.data.message)
    );
  }
};

export const clearAllSkillErrors = () => (dispatch:AppDispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};

export const resetSkillSlice = () => (dispatch:AppDispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;