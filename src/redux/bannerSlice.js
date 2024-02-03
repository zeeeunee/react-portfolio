import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBanner = createAsyncThunk('banner/requestBanner', async () => {
	const data = await fetch(`${process.env.PUBLIC_URL}/DB/banner.json`);
	const json = await data.json();
	return json.banner;
});

const bannerSlice = createSlice({
	name: 'banner',
	initialState: {
		data: [],
		isLoading: false
	},
	extraReducers: builder => {
		builder
			.addCase(fetchBanner.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchBanner.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(fetchBanner.rejected, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			});
	}
});

export default bannerSlice.reducer;
