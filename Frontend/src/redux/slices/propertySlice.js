

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProperties } from "../../services/propertyService";

// Fetch ALL or FILTERED properties
export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (filters) => {
    const res = await getProperties(filters);
    // console.log("res from slice",res)
    return { data: res.properties, filters }; // include filters info
  }
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    allProperties: [],       // store all properties
    filteredProperties: [],  // store filtered properties
    loading: false,
    error: null,
  },
  reducers: {
    clearFilter: (state) => {
      state.filteredProperties = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.filters) {
          // This is a filtered fetch
          state.filteredProperties = action.payload.data;
        } else {
          // This is fetching all properties
          state.allProperties = action.payload.data;
        }
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearFilter } = propertiesSlice.actions;
export default propertiesSlice.reducer;
