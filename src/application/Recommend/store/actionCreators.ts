import * as actionTypes from './constants'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'
import { Banner, Recommend } from './data'

export type changeBannerList = {
  type: typeof actionTypes.CHANGE_BANNER
  payload: Banner[]
}

export type changeRecommendList = {
  type: typeof actionTypes.CHANGE_RECOMMEND_LIST
  payload: Recommend[]
}

export type changeEnterLoading = {
  type: typeof actionTypes.CHANGE_ENTER_LOADING
  payload: boolean
}

export type RecommendAction = changeBannerList | changeRecommendList | changeEnterLoading

export const changeBannerList = (payload: Banner[]): changeBannerList => ({
  type: actionTypes.CHANGE_BANNER,
  payload,
})

export const changeRecommendList = (payload: Recommend[]): changeRecommendList => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  payload,
})

export const changeEnterLoading = (payload: boolean): changeEnterLoading => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload
})

export const getBannerList = () => {
  return (dispatch: any) => {
    getBannerRequest().then(data => {
      dispatch(changeBannerList(data.banners))
      dispatch(changeEnterLoading(false))
    }).catch(() => {
      console.log('轮播图出错了')
    })
  }
}

export const getRecommendList = () => {
  return (dispatch: any) => {
    getRecommendListRequest().then(data => {
      dispatch(changeRecommendList(data.result))
    }).catch(() => {
      console.log('推荐歌单出错了')
    })
  }
}