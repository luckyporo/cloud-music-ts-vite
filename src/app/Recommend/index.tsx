import React, { memo, useEffect } from 'react'
import { forceCheck } from 'react-lazyload'

import Loading from '../../layout/loading'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import Scroll from '../../components/scroll'
import { Content } from './style'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  getBannerList,
  getRecommendList,
  selectBannerList,
  selectEnterLoading,
  selectRecommendList,
} from './store/slice'

const Recommend: React.FC = () => {
  const bannerList = useAppSelector(selectBannerList)
  const recommendList = useAppSelector(selectRecommendList)
  const enterLoading = useAppSelector(selectEnterLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!bannerList?.length) dispatch(getBannerList())
    if (!recommendList?.length) dispatch(getRecommendList())
  }, [])

  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading></Loading> : null}
    </Content>
  )
}

export default memo(Recommend)
