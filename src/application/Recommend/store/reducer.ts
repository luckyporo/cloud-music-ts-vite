import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  bannerList: [],
  recommendList: []
}) as any

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data)
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data)
    default:
      return state
  }
} 