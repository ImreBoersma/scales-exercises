import { configureStore } from '@reduxjs/toolkit'
import { scalesReducer } from './scalesSlice'

export const store = configureStore({
    reducer: {
        scales: scalesReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch