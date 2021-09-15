import React, { memo, useEffect } from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

import Scroll from '@/components/scroll'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

import { getRankList, selectLoading, selectRankList } from './store/slice'
import { RankList, Track } from './store/types'
import { Container, List, ListItem, SongList } from './style'

const filterIndex = (rankList: RankList[]) => {
  for (let i = 0; i < rankList.length; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) return i + 1
  }
}

const Rank = ({ route, history }: RouteConfigComponentProps) => {
  const rankList = useAppSelector(selectRankList)
  const loading = useAppSelector(selectLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!rankList.length) dispatch(getRankList())
  }, [])

  const globalStartIndex = filterIndex(rankList)
  const officialList = rankList.slice(0, globalStartIndex)
  const globalList = rankList.slice(globalStartIndex)

  const enterDetail = (detail: RankList) => {
    history.push(`/rank/${detail.id}`)
  }

  const renderSongList = (list: Track[]) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          )
        })}
      </SongList>
    ) : null
  }

  const renderRankList = (list: RankList[], global = false) => {
    return (
      <List globalRank={global}>
        {list.map((item) => {
          return (
            <ListItem
              key={item.id}
              tracks={item.tracks}
              onClick={() => enterDetail(item)}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequency">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          )
        })}
      </List>
    )
  }

  const displayStyle = loading ? { display: 'none' } : { display: '' }

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
        </div>
      </Scroll>
      {renderRoutes(route?.routes)}
    </Container>
  )
}

export default memo(Rank)
