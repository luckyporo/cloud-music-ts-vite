import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/store/types'
import { getRankListRequest } from '@/utils/request'

import { RankList, RankState } from './types'

const initialState: RankState = {
  rankList: [],
  loading: true,
}

export const getRankList = createAsyncThunk(
  'rank/getRankList',
  async () => await getRankListRequest(),
)

export const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
  extraReducers: {
    [getRankList.fulfilled.type]: (
      state,
      action: PayloadAction<{ list: RankList[] }>,
    ) => {
      state.rankList = action.payload.list
      state.loading = false
    },
  },
})

export const { changeLoading } = rankSlice.actions

export const selectRankList = (state: RootState) => state.rank.rankList

export const selectLoading = (state: RootState) => state.rank.loading

export default rankSlice.reducer
