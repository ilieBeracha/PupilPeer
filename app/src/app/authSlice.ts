import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const token = window.localStorage.getItem("token");
let initialState = null;

if (token) {
  const { firstName, lastName, sub, image, email } = jwtDecode<{
    firstName: string;
    lastName: string;
    sub: number;
    image: string;
    email: string;
  }>(token);
  initialState = { firstName, lastName, sub, image, email };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRedux: (state, action: PayloadAction<string>) => {
      const { firstName, lastName, sub, image, email } = jwtDecode<{
        firstName: string;
        lastName: string;
        sub: number;
        image: string;
        email: string;
      }>(action.payload);
      state = { firstName, lastName, sub, image, email };
      window.localStorage.setItem("token", action.payload);
      return state;
    },
    logoutRedux: () => {
      window.localStorage.removeItem(`token`);
      return null;
    },
  },
});

export const { loginRedux, logoutRedux } = authSlice.actions;

export default authSlice.reducer;
