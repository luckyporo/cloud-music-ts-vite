import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/store/types'
import { getBannerListRequest, getRecommendListRequest } from '@/utils/request'

import { Banner, Recommend, RecommendState } from './types'

const initialState: RecommendState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
}

export const getBannerList = createAsyncThunk(
  'recommend/getBannerList',
  async () => await getBannerListRequest(),
)
export const getRecommendList = createAsyncThunk(
  'recommend/getRecommendList',
  async () => await getRecommendListRequest(),
)

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: {
    [getBannerList.fulfilled.type]: (
      state,
      action: PayloadAction<{ banners: Banner[] }>,
    ) => {
      state.bannerList = action.payload.banners
      state.enterLoading = false
    },
    [getRecommendList.fulfilled.type]: (
      state,
      action: PayloadAction<{ result: Recommend[] }>,
    ) => {
      state.recommendList = action.payload.result
    },
  },
})

export const selectBannerList = (state: RootState): Banner[] => state.recommend.bannerList

export const selectRecommendList = (state: RootState): Recommend[] =>
  state.recommend.recommendList

export const selectEnterLoading = (state: RootState): boolean =>
  state.recommend.enterLoading

export default recommendSlice.reducer
