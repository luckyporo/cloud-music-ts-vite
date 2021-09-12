import React, { forwardRef, memo } from 'react'
import styled from 'styled-components'

import style from '@/assets/global-style'

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style['font-color-desc']};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${style['font-size-l']};
    font-weight: 700;
  }
`

type Props = {
  handleClick: () => void
  title: string
}

// 函数组件拿不到ref，需要用forward传递ref
const Header = forwardRef<HTMLDivElement, Props>(({ handleClick, title }, ref) => {
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" aria-hidden="true" onClick={handleClick}>
        &#xe655;
      </i>
      <h1>{title}</h1>
    </HeaderContainer>
  )
})

export default memo(Header)
