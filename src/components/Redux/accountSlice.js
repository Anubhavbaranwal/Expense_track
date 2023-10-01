import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../Utils";

//inital state
const initialState = {
  account: {},
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

//account to create account/project

export const updateAccountAction = createAsyncThunk(
  "account/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, initialBalance, accountType, notes, id } = payload;
    try {
      //get the token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      //pass the token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make the request
      const { data } = await axios.put(
        `${baseURL}/accounts/${id}`,
        {
          name,
          accountType,
          notes,
          initialBalance,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//get single account
export const getSingleAccountAction = createAsyncThunk(
  "account/get-details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      //get the token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      //pass the token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make the request
      const { data } = await axios.get(`${baseURL}/accounts/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
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
    //fetch single account
    builder.addCase(getSingleAccountAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
    });
    builder.addCase(getSingleAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.error = action.payload;
    });

    //update account
    builder.addCase(updateAccountAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.account = action.payload;
    });
    builder.addCase(updateAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.error = action.payload;
      state.isUpdated = false;
    });
  },
});
const acccountReducer = AccountsSlice.reducer;
export default acccountReducer;
