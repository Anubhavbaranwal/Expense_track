import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../Utils";

const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
//register
export const registerUserAct = createAsyncThunk(
  "user/register",
  async (
    { fullname, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const Config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${baseURL}/users/register`,
        {
          fullname,
          email,
          password,
        },
        Config
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//login
export const loginUserAct = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      const Config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${baseURL}/users/login`,
        {
          email,
          password,
        },
        Config
      );
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//Logout
export const logoutUserAct = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("userInfo");
  return null;
});
//get profile
export const getProfileAction = createAsyncThunk(
  "users/getProfile",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.userRegister?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUserAct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAct.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(registerUserAct.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
    builder.addCase(loginUserAct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUserAct.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(loginUserAct.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
    //logout action
    builder.addCase(logoutUserAct.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = null;
    });
    //profile action
    builder.addCase(getProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.profile = " ";
    });
  },
});

export default userSlice.reducer;
