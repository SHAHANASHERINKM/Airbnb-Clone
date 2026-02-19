// import { createSlice } from "@reduxjs/toolkit";

// const getUserFromStorage = () => {
//   try {
//     const user = localStorage.getItem("user");
//     return user ? JSON.parse(user) : null;
//   } catch (err) {
//     console.error("Invalid JSON in localStorage user:", err);
//     return null;
//   }
// };

// const getTokenFromStorage = () => {
//   return localStorage.getItem("token") || null;
// };

// const initialState = {
//   user: getUserFromStorage(),
//   token: getTokenFromStorage(),
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       console.log("payload",action.payload)
//   state.user = action.payload.user ;
//   state.token = action.payload.token ;
// },

//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.clear();
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error("Invalid JSON in localStorage user:", err);
    return null;
  }
};

const getTokenFromStorage = () => {
  return localStorage.getItem("token") || null;
};

//  Async thunk to refresh user
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${BASE_URL}users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Save to localStorage properly
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;

        // Update localStorage when status changes
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
