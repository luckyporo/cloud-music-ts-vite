import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'
import { Banner, Recommend } from './data'

export interface changeBannerListType {
  type: typeof actionTypes.CHANGE_BANNER
  data: Banner[]
}

export interface changeRecommendListType {
  type: typeof actionTypes.CHANGE_RECOMMEND_LIST
  data: Recommend[]
}

export interface changeEnterLoadingType {
  type: typeof actionTypes.CHANGE_ENTER_LOADING
  data: boolean
}

export type RecommendActionTypes = changeBannerListType | changeRecommendListType | changeEnterLoadingType

export const changeBannerList = (data: Banner[]): changeBannerListType => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data) as Banner[],
})

export const changeRecommendList = (data: Recommend[]): changeRecommendListType => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data) as Recommend[],
})

export const changeEnterLoading = (data: boolean): changeEnterLoadingType => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const getBannerList = () => {
  return (dispatch: any) => {
    // const { banner, isError, isLoading } = useBanner()
    // if (!isError && !isLoading) dispatch(changeBannerList(banner))
    // if (isError) console.log(isError)
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
    // const { recommendList, isError, isLoading } = useRecommendList()
    // if (!isError && !isLoading) dispatch(changeRecommendList(recommendList))
    // if (isError) console.log(isError)
    getRecommendListRequest().then(data => {
      dispatch(changeRecommendList(data.result))
    }).catch(() => {
      console.log('推荐歌单出错了')
    })
  }
}