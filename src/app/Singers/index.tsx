import React, { memo, useState } from 'react'

import Scroll from '@/components/scroll'
import Horizon from '@/layout/horizon'
import { alphaTypes, categoryTypes } from '@/utils/config'

import { List, ListContainer, ListItem, NavContainer } from './style'

const Singers = () => {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')

  const handleUpdateCategory = (val: string) => setCategory(val)
  const handleUpdateAlpha = (val: string) => setAlpha(val)

  // mock
  const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => ({
    picUrl: 'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
    name: '隔壁老樊',
    accountId: 277313426,
  }))

  return (
    <div>
      <NavContainer>
        <Horizon
          list={categoryTypes}
          title="分类（默认热门）："
          handleClick={handleUpdateCategory}
          cur={category}></Horizon>
        <Horizon
          list={alphaTypes}
          title="首字母："
          handleClick={handleUpdateAlpha}
          cur={alpha}></Horizon>
      </NavContainer>
      <ListContainer>
        <Scroll>
          <List>
            {singerList.map((item, index) => {
              return (
                <ListItem key={item.accountId + '' + index}>
                  <div className="img_wrapper">
                    <img
                      src={`${item.picUrl}?param=300x300`}
                      width="100%"
                      height="100%"
                      alt="music"
                    />
                  </div>
                  <span className="name">{item.name}</span>
                </ListItem>
              )
            })}
          </List>
        </Scroll>
      </ListContainer>
    </div>
  )
}

export default memo(Singers)
