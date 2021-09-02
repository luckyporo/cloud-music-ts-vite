import React, { memo } from 'react'
import LazyLoad from 'react-lazyload'

import placeHolderImg from '/img/music.png'
import { getCount } from '@/utils/utils'

import { List, ListItem, ListWrapper } from './style'

type Props = {
  recommendList: {
    id: number
    picUrl: string
    playCount: number
    name: string
  }[]
}

function RecommendList(props: Props) {
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {props.recommendList.map((item, index) => {
          return (
            <ListItem key={item.id + index}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                <LazyLoad
                  placeholder={
                    <img width="100%" height="100%" src={placeHolderImg} alt="music" />
                  }>
                  <img
                    src={item.picUrl + '?param=300x300'}
                    alt="music"
                    width="100%"
                    height="100%"
                  />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          )
        })}
      </List>
    </ListWrapper>
  )
}

export default memo(RecommendList)
