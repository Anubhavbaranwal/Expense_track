import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import acccountReducer from "./accountSlice";
import transactionsReducer from "./aadTransactions";

const Store = configureStore({
  reducer: {
    userRegister: userSlice,
    Accounts: acccountReducer,
    transaction: transactionsReducer,
  },
});
export default Store;
