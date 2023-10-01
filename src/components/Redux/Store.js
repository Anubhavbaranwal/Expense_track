import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import acccountReducer from "./accountSlice";

const Store = configureStore({
  reducer: {
    userRegister: userSlice,
    Accounts: acccountReducer,
  },
});
export default Store;
