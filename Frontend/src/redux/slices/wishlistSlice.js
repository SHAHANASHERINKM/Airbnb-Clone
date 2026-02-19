import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWishlist, toggleWishlist } from "../../services/propertyService";



export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async () => {
    return await getWishlist();
  }
);


export const toggleWishlistApi = createAsyncThunk(
  "wishlist/toggle",
  async (propertyId) => {
    const res = await toggleWishlist(propertyId);

    return {
      propertyId,
      isWishlisted: res.isWishlisted,
      property: res.property, 
    };
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload;
      })

      // Toggle wishlist
      .addCase(toggleWishlistApi.fulfilled, (state, action) => {
  const { propertyId, isWishlisted, property } = action.payload;

  if (isWishlisted) {
    // Avoid duplicates
    const exists = state.wishlistItems.find(p => p._id === propertyId);
    if (!exists) {
      state.wishlistItems.push(property); // ✅ STORE FULL PROPERTY
    }
  } else {
    state.wishlistItems = state.wishlistItems.filter(
      item => item._id !== propertyId
    );
  }
});

  },
});

export default wishlistSlice.reducer;
