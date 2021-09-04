import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/store/types'
import { getHotSingerListRequest, getSingerListRequest } from '@/utils/request'

import { Singer, SingersState } from './types'

const initialState: SingersState = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0,
}

export const getHotSingerList = createAsyncThunk(
  'signer/getHotSingerList',
  async (count: number) => await getHotSingerListRequest(count),
)
export const getSingerList = createAsyncThunk(
  'singer/getSingerList',
  async ({
    type,
    area,
    alpha,
    count,
  }: {
    type: string
    area: string
    alpha: string
    count: number
  }) => await getSingerListRequest(type, area, alpha, count),
)

export const SingersSlice = createSlice({
  name: 'singers',
  initialState,
  reducers: {
    changePageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload
    },
    changeEnterLoading: (state, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload
    },
    changePullUpLoading: (state, action: PayloadAction<boolean>) => {
      state.pullUpLoading = action.payload
    },
    changePullDownLoading: (state, action: PayloadAction<boolean>) => {
      state.pullDownLoading = action.payload
    },
    clearSingerList: (state) => {
      state.singerList = []
    },
  },
  extraReducers: {
    [getHotSingerList.pending.type]: (state) => {
      state.enterLoading = true
      if (state.pageCount === 0) state.pullDownLoading = true
      else state.pullUpLoading = true
    },
    [getHotSingerList.fulfilled.type]: (
      state,
      action: PayloadAction<{ artists: Singer[] }>,
    ) => {
      // 第一次加载热门歌手
      if (state.pageCount === 0) {
        state.singerList = action.payload.artists
        state.pullDownLoading = false
      } else {
        // 加载更多热门歌手
        state.singerList = [...state.singerList, ...action.payload.artists]
        state.pullUpLoading = false
      }
      state.pageCount = state.singerList.length
      state.enterLoading = false
    },
    [getSingerList.pending.type]: (state) => {
      state.enterLoading = true
      if (state.pageCount === 0) state.pullDownLoading = true
      else state.pullUpLoading = true
    },
    [getSingerList.fulfilled.type]: (
      state,
      action: PayloadAction<{ artists: Singer[] }>,
    ) => {
      // 第一次加载对应类型和地区歌手
      if (state.pageCount === 0) {
        state.singerList = action.payload.artists
        state.pullDownLoading = false
      } else {
        // 加载更多对应类型和地区歌手
        state.singerList = [...state.singerList, ...action.payload.artists]
        state.pullUpLoading = false
      }
      state.pageCount = state.singerList.length
      state.enterLoading = false
    },
  },
})

export const {
  changePageCount,
  changeEnterLoading,
  changePullDownLoading,
  changePullUpLoading,
  clearSingerList,
} = SingersSlice.actions

export const selectSingerList = (state: RootState) => state.singers.singerList

export const selectEnterLoading = (state: RootState) => state.singers.enterLoading

export const selectPullDownLoading = (state: RootState) => state.singers.pullDownLoading

export const selectPullUpLoading = (state: RootState) => state.singers.pullUpLoading

export const selectPageCount = (state: RootState) => state.singers.pageCount

export default SingersSlice.reducer
