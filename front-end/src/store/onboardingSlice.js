import { createSlice } from "@reduxjs/toolkit";

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    user: null,
  },
  reducers: {
    userAdded(state, action) {
      state.user = action.payload.user;
    },
  },
});

export const { userAdded } = onboardingSlice.actions;
export default onboardingSlice.reducer;
