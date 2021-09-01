import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { RecommendStateType } from './data'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'

export interface changeBannerListType {
  type: typeof actionTypes.CHANGE_BANNER
  data: RecommendStateType
}

export interface changeRecommendListType {
  type: typeof actionTypes.CHANGE_RECOMMEND_LIST
  data: RecommendStateType
}

export type RecommendActionTypes = changeBannerListType | changeRecommendListType


export const changeBannerList = (data: RecommendStateType): changeBannerListType => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data) as RecommendStateType,
})

export const changeRecommendList = (data: RecommendStateType): changeRecommendListType => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data) as RecommendStateType,
})

export const getBannerList = () => {
  return (dispatch: any) => {
    // const { banner, isError, isLoading } = useBanner()
    // if (!isError && !isLoading) dispatch(changeBannerList(banner))
    // if (isError) console.log(isError)
    getBannerRequest().then(data => {
      console.log(data)
      dispatch(changeBannerList(data.banners))
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
      console.log(data)
      dispatch(changeRecommendList(data.result))
    }).catch(() => {
      console.log('推荐歌单出错了')
    })
  }
}