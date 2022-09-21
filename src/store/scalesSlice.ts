import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { db } from '../services/firebase.service'
import { collection, getDocs } from "firebase/firestore"
import { Scale } from '../utils/types'
import { mapToScale } from '../utils/mapper'

const initialState: { scales: Scale[] } = {
    scales: []
}

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
                state.scales.push(...payload)
            })
    },
})

export const { generate } = scalesSlice.actions

export const selectScales = (state: RootState) => state.scales

export const scalesReducer = scalesSlice.reducer

export const fetchScales = createAsyncThunk(
    'scales/fetch',
    async () => {
        const querySnapshot = await getDocs(collection(db, "scales"))
        return querySnapshot.docs.map((doc) => {
            return mapToScale({ doc: doc.data(), id: doc.id })
        })
    }
)