import React, { memo, useEffect, useState } from 'react'
import LazyLoad, { forceCheck } from 'react-lazyload'

import placeHolderImg from '/img/singer.png'
import Scroll from '@/components/scroll'
import Horizon from '@/layout/horizon'
import Loading from '@/layout/loading'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { alphaTypes, categoryTypes } from '@/utils/config'

import {
  changePageCount,
  clearSingerList,
  getHotSingerList,
  getSingerList,
  selectEnterLoading,
  selectPageCount,
  selectPullDownLoading,
  selectPullUpLoading,
  selectSingerList,
} from './store/slice'
import { List, ListContainer, ListItem, NavContainer } from './style'

const Singers = () => {
  const [category, setCategory] = useState('')
  const [type, setType] = useState('')
  const [area, setArea] = useState('')
  const [alpha, setAlpha] = useState('')

  const singerList = useAppSelector(selectSingerList)
  const enterLoading = useAppSelector(selectEnterLoading)
  const count = useAppSelector(selectPageCount)
  const pullDownLoading = useAppSelector(selectPullDownLoading)
  const pullUpLoading = useAppSelector(selectPullUpLoading)
  const dispatch = useAppDispatch()

  // 改变歌手分类
  const handleUpdateCategory = (val: string) => {
    setCategory(val)
    const target = categoryTypes.find((c) => c.key === val)
    if (target) {
      setType(target.type)
      setArea(target.area)
    }
  }
  // 改变歌手字母
  const handleUpdateAlpha = (val: string) => {
    setAlpha(val)
  }

  // 下拉更新
  const handlePullUp = () => {
    console.log('handlePullUp')
    if (category || alpha) dispatch(getSingerList({ type, area, alpha, count }))
    else dispatch(getHotSingerList(count))
  }

  // 上拉刷新
  const handlePullDown = () => {
    console.log('handlePullDown')
    dispatch(clearSingerList())
    dispatch(changePageCount(0))
    if (category || alpha) {
      dispatch(getSingerList({ type, area, alpha, count: 0 }))
    } else {
      dispatch(getHotSingerList(0))
    }
  }

  // 更新歌手列表
  useEffect(() => {
    console.log('更新歌手列表')
    // 更改了分类需要重置分页和歌手列表
    dispatch(clearSingerList())
    dispatch(changePageCount(0))
    if (category || alpha) {
      dispatch(getSingerList({ type, area, alpha, count: 0 }))
    }
    // 存在category alpha和state却没有值时是由组件切换引起的
    if (!singerList.length) dispatch(getHotSingerList(0))
  }, [category, alpha])

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
        <Scroll
          onScroll={forceCheck}
          pullDownLoading={pullDownLoading}
          pullUpLoading={pullUpLoading}
          pullDown={handlePullDown}
          pullUp={handlePullUp}>
          <List>
            {singerList.map((item, index) => {
              return (
                <ListItem key={item.accountId + '' + index}>
                  <div className="img_wrapper">
                    <LazyLoad
                      placeholder={
                        <img
                          width="100%"
                          height="100%"
                          src={placeHolderImg}
                          alt="singer"
                        />
                      }>
                      <img
                        src={`${item.picUrl}?param=300x300`}
                        width="100%"
                        height="100%"
                        alt="signer"
                      />
                    </LazyLoad>
                  </div>
                  <span className="name">{item.name}</span>
                </ListItem>
              )
            })}
          </List>
        </Scroll>
      </ListContainer>
      {enterLoading ? <Loading></Loading> : null}
    </div>
  )
}

export default memo(Singers)
