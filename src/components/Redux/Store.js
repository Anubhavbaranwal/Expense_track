import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const Store = configureStore({
  reducer: {
    userRegister: userSlice,
  },
});
export default Store;
