import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/store/types'
import { getAlbumDetailRequest } from '@/utils/request'

import { Album, AlbumState } from './typs'

const initialState: AlbumState = {
  currentAlbum: {
    creator: {
      avatarUrl: '',
      nickname: '',
    },
    coverImgUrl: '',
    subscribedCount: 0,
    name: '',
    tracks: [],
  },
  enterLoading: false,
}

export const getAlbumDetail = createAsyncThunk(
  'album/getAlbumDetail',
  async (id: string) => await getAlbumDetailRequest(id),
)

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload
    },
  },
  extraReducers: {
    [getAlbumDetail.fulfilled.type]: (
      state,
      action: PayloadAction<{ playlist: Album }>,
    ) => {
      state.currentAlbum = action.payload.playlist
      state.enterLoading = false
    },
  },
})

export const { changeLoading } = albumSlice.actions

export const selectCurrentAlbum = (state: RootState) => state.album.currentAlbum

export const selectEnterLoading = (state: RootState) => state.album.enterLoading

export default albumSlice.reducer
