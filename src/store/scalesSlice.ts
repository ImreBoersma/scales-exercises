import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../services/firebase.service";
import type { RootState } from "../store";
import { mapToScale } from "../utils/mapper";
import type { Scale } from "../utils/types";

const initialState: { scales: Scale[] } = {
	scales: [],
};

export const scalesSlice = createSlice({
	name: "scales",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchScales.fulfilled, (state, { payload }) => {
			state.scales = payload;
		});
	},
});

export const selectScales = (state: RootState) => state.scales;

export const scalesReducer = scalesSlice.reducer;

export const fetchScales = createAsyncThunk("scales/fetch", async () => {
	const querySnapshot = await getDocs(collection(db, "scales"));
	return querySnapshot.docs.map((doc) => {
		return mapToScale({ doc: doc.data(), id: doc.id });
	});
});
