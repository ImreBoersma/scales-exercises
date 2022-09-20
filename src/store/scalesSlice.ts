import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { db } from '../services/firebase.service'
import { collection, getDocs } from "firebase/firestore";

const initialState: any[] = []

export const scalesSlice = createSlice({
    name: 'scales',
    initialState,
    reducers: {
        generate: (state) => {
            console.log(state)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchScales.fulfilled,
            (state, { payload }) => {
                state.push(...payload);
            });
    },
})

export const { generate } = scalesSlice.actions

export const selectScales = (state: RootState) => state.scales

export const scalesReducer = scalesSlice.reducer

export const fetchScales = createAsyncThunk(
    'scales/fetch',
    async () => {
        const querySnapshot = await getDocs(collection(db, "scales"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
        return querySnapshot.docs
    }
)