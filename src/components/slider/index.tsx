import 'swiper/css'
import 'swiper/css/pagination'

import React, { memo } from 'react'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { SliderContainer } from './style'

type Props = {
  bannerList: {
    imageUrl: string
  }[]
}

SwiperCore.use([Pagination])

function Slider(props: Props) {
  const { bannerList } = props

  return (
    <SliderContainer>
      <div className="before"></div>
      <Swiper pagination={true} loop={true} className="slider-container">
        {bannerList.map((slider) => {
          return (
            <SwiperSlide key={slider.imageUrl}>
              <div className="slider-nav">
                <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </SliderContainer>
  )
}

export default memo(Slider)
