import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../Utils";

//inital state
const initialState = {
  account: null,
  accounts: [],
  error: null,
  loading: false,
  success: false,
  isUpdated: false,
};
//acccount to create acount

export const createAccountAction = createAsyncThunk(
  "account/create",
  async (payload, { rejectValue, getState, dispatch }) => {
    const { name, intialBalance, accountType, notes } = payload;
    try {
      //get token
      const token = getState()?.userRegister?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/accounts`,
        {
          name,
          accountType,
          notes,
          intialBalance,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectValue(error?.response?.data?.message);
    }
  }
);

//Slice Created
const AccountsSlice = createSlice({
  name: "Accounts",
  initialState,
  extraReducers: (builder) => {
    //account create
    builder.addCase(createAccountAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
    });
    builder.addCase(createAccountAction.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.account = null;
    });
  },
});
const acccountReducer = AccountsSlice.reducer;
export default acccountReducer;
