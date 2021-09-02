import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from './store/actionCreators'
import { forceCheck } from 'react-lazyload'

import Loading from '../../baseUI/loading'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import Scroll from '../../components/scroll'
import { Content } from './style'

type Props = {
  [key: string]: any
}

function Recommend(props: Props) {
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    if(!bannerList?.length) getBannerDataDispatch()
    if(!recommendList?.length) getRecommendListDataDispatch()
  }, [])

  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      { enterLoading ? <Loading></Loading> : null }
    </Content>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
  bannerList: state.recommend.bannerList,
  recommendList: state.recommend.recommendList,
  enterLoading: state.recommend.enterLoading
})
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend))
