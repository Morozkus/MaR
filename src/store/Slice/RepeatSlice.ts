import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getFromStorage, setForStorage } from "../../utils/storage"
import { getDobbleRandomNumber } from "../../utils/random"

export type TDifficult = 'easy' | 'medium' | 'hard'

interface IRepeatSettings {
  width: number,
  height: number,
  difficult: TDifficult
}

interface IRepeatSlice {
  isStart: boolean,
  settings: IRepeatSettings,
  repeatList: [number, number][],
  round: number

}

const initialState: IRepeatSlice = {
  isStart: false,
  settings: {
    width: Number(getFromStorage('width')) || 3,
    height: Number(getFromStorage('height')) || 1,
    difficult: getFromStorage('difficult') as TDifficult || 'easy'
  },
  repeatList: [],
  round: 1
}

const repeatSlice = createSlice({
  name: 'repeat',
  initialState,
  reducers: {
    setStart(state, action: PayloadAction<boolean>) {
      state.isStart = action.payload
    },

    setWidth(state, action: PayloadAction<number>) {
      if (action.payload <= 0) return
      setForStorage('width', action.payload)
      state.settings.width = action.payload
    },

    setHeight(state, action: PayloadAction<number>) {
      if (action.payload <= 0) return
      setForStorage('height', action.payload)
      state.settings.height = action.payload
    },

    setDifficult(state, action: PayloadAction<TDifficult>) {
      setForStorage('difficult', action.payload)
      state.settings.difficult = action.payload
    },

    pushToRepeatList(state) {
      state.repeatList.push(getDobbleRandomNumber(state.settings.height, state.settings.width))
    }
  }
})

export default repeatSlice.reducer
export const { setStart, setWidth, setHeight, setDifficult, pushToRepeatList } = repeatSlice.actions