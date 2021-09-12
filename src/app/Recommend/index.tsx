import React, { memo, useEffect } from 'react'
import { forceCheck } from 'react-lazyload'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

import RecommendList from '@/components/list'
import Scroll from '@/components/scroll'
import Slider from '@/components/slider'
import Loading from '@/layout/loading'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

import {
  getBannerList,
  getRecommendList,
  selectBannerList,
  selectEnterLoading,
  selectRecommendList,
} from './store/slice'
import { Content } from './style'

const Recommend = ({ route }: RouteConfigComponentProps) => {
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
      {renderRoutes(route?.routes)}
    </Content>
  )
}

export default memo(Recommend)
