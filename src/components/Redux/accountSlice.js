import { createAsyncThunk } from "@reduxjs/toolkit";
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
const createAccountAction = createAsyncThunk(
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
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
