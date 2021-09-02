import { RecommendState } from './data.d';
import * as actionTypes from './constants'
import { Reducer } from 'redux'
import { RecommendAction } from './actionCreators';
import produce from 'immer'

const defaultState: RecommendState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
}

const reducer: Reducer<RecommendState, RecommendAction> = (state = defaultState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.CHANGE_BANNER:
        draft.bannerList = action.payload
        break
      case actionTypes.CHANGE_RECOMMEND_LIST:
        draft.recommendList = action.payload
        break
      case actionTypes.CHANGE_ENTER_LOADING:
        draft.enterLoading = action.payload
        break
      default:
        state
        break
    }
  })
}

export default reducer