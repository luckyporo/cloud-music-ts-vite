import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBannerListRequest, getRecommendListRequest } from '../../../utils/request';
import { RootState } from '../../../store/types';
import { Banner, Recommend, RecommendState } from './types';

const initialState: RecommendState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true
}

export const getBannerList = createAsyncThunk('recommend/getBannerList', async() => await getBannerListRequest())
export const getRecommendList = createAsyncThunk('recommend/getRecommendList', async() => await getRecommendListRequest())

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: {
    [getBannerList.fulfilled.type]: (state, action: PayloadAction<{ banners: Banner[]}>) => {
      // console.log('getBannerListAction', action)
      state.bannerList = action.payload.banners
      state.enterLoading = false
    },
    [getRecommendList.fulfilled.type]: (state, action: PayloadAction<{ result: Recommend[] }>) => {
      // console.log('getRecommendListAction', action)
      state.recommendList = action.payload.result
    }
  }
})

export const selectBannerList = (state: RootState) => state.recommend.bannerList

export const selectRecommendList = (state: RootState) => state.recommend.recommendList

export const selectEnterLoading = (state: RootState) => state.recommend.enterLoading

export default recommendSlice.reducer
