import { createSlice } from "@reduxjs/toolkit";
import { User } from "../context/app-context";
import { getUtcTimeDifference } from "../components/FoodOrder/Helper";

export type AuthStateType = { user: User; expiresIn: string; token: string };

const initState: AuthStateType = {
  user: null,
  expiresIn: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login(state, action) {},
    logOut() {},
    setLoginData(state, action) {
      state.user = action.payload.user;
      state.expiresIn = action.payload.expiresIn;
      state.token = action.payload.token;
      const logOutTimer = setTimeout(() => {},
      getUtcTimeDifference(state.expiresIn));
    },
  },
});

export default authSlice;
export const authActions = authSlice.actions;
