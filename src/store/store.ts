import { configureStore } from '@reduxjs/toolkit'
import RepeatSlice from './Slice/RepeatSlice'

// Определение общего хранилища
export const store = configureStore({
  reducer: {
    RepeatSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch