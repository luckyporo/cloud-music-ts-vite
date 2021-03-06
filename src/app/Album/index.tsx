import { isEmpty } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RouteConfigComponentProps } from 'react-router-config'
import { CSSTransition } from 'react-transition-group'

import style from '@/assets/global-style'
import Scroll from '@/components/scroll'
import Header from '@/layout/header'
import Loading from '@/layout/loading'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getCount, getName } from '@/utils/utils'

import { getAlbumDetail, selectCurrentAlbum, selectEnterLoading } from './store/slice'
import { Container, Menu, SongItem, SongList, TopDesc } from './style'

const Album = ({ history, match }: RouteConfigComponentProps<{ id: string }>) => {
  const [showStatus, setShowStatus] = useState(true)
  const [title, setTitle] = useState('歌单')
  const id = match.params.id

  const headerEl = useRef<HTMLDivElement>(null)

  const currentAlbum = useAppSelector(selectCurrentAlbum)
  const enterLoading = useAppSelector(selectEnterLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAlbumDetail(id))
  }, [])

  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const handleScroll = useCallback(
    (pos) => {
      const minScrollY = -45
      const percent = Math.abs(pos.y / minScrollY)
      const headerDom = headerEl.current
      //滑过顶部的高度开始变化
      if (headerDom) {
        if (pos.y < minScrollY) {
          headerDom.style.backgroundColor = style['theme-color']
          headerDom.style.opacity = `${Math.min(1, (percent - 1) / 2)}`
          setTitle(currentAlbum.name)
        } else {
          headerDom.style.backgroundColor = ''
          headerDom.style.opacity = '1'
          setTitle('歌单')
        }
      }
    },
    [currentAlbum],
  )

  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万{' '}
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    )
  }

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    )
  }

  const renderSongList = () => {
    return (
      <SongList showBackground={false}>
        <div className="first_line">
          <div className="play_all">
            <i className="iconfont">&#xe6e3;</i>
            <span>
              {' '}
              播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span>
            </span>
          </div>
          <div className="add_list">
            <i className="iconfont">&#xe62d;</i>
            <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
          </div>
        </div>
        <SongItem>
          {currentAlbum.tracks.map((item, index) => {
            return (
              <li key={index}>
                <span className="index">{index + 1}</span>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.ar)} - {item.al.name}
                  </span>
                </div>
              </li>
            )
          })}
        </SongItem>
      </SongList>
    )
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={history.goBack}>
      <Container>
        <Header ref={headerEl} title={title} handleClick={handleBack}></Header>
        {!isEmpty(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              {renderTopDesc()}
              {renderMenu()}
              {renderSongList()}
            </div>
          </Scroll>
        ) : null}
        {enterLoading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  )
}

export default Album
