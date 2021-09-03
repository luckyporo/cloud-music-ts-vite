import React, { memo, useEffect, useRef } from 'react'
import styled from 'styled-components'

import style from '@/assets/global-style'
import Scroll from '@/components/scroll'
import { categoryType } from '@/utils/config'

type Props = {
  list?: categoryType[]
  cur?: string
  title?: string
  handleClick: (key: string) => void
}

const Horizon = ({ list = [], cur = '', title = '', handleClick }: Props) => {
  const categoryRef = useRef<HTMLDivElement>(null)

  // 初始化内部元素宽度
  useEffect(() => {
    const divElement = categoryRef.current
    if (divElement === null) return
    const spanElements = divElement.querySelectorAll('span')
    let totalWidth = 0
    if (typeof spanElements !== 'undefined') {
      spanElements.forEach((e) => (totalWidth += e.offsetWidth))
    }
    divElement.style.width = `${totalWidth}px`
  }, [])

  return (
    <Scroll direction="horizontal">
      <div ref={categoryRef}>
        <List>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <ListItem
                key={item.key}
                className={`${cur === item.key ? 'selected' : ''}`}
                onClick={() => handleClick(item.key)}>
                {item.name}
              </ListItem>
            )
          })}
        </List>
      </div>
    </Scroll>
  )
}

const List = styled.div`
  display: block;
  align-items: center;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  > span:first-of-type {
    display: inline-block;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style['font-size-m']};
  }
`

const ListItem = styled.span`
  display: inline-block;
  font-size: ${style['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style['theme-color']};
    border: 1px solid ${style['theme-color']};
    opacity: 0.8;
  }
`

export default memo(Horizon)
