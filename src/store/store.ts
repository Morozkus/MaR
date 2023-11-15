import { configureStore } from '@reduxjs/toolkit'
import RepeatSlice from './Slice/RepeatSlice'


export const store = configureStore({
  reducer: {
    RepeatSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch