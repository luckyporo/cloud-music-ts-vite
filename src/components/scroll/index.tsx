import BScroll from '@better-scroll/core'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { ScrollContainer } from './style'

type Props = {
  direction?: 'vertical' | 'horizontal'
  click?: boolean
  refresh?: boolean
  pullUpLoading?: boolean
  pullDownLoading?: boolean
  bounceTop?: boolean
  bounceBottom?: boolean
  // eslint-disable-next-line no-unused-vars
  onScroll?: (scroll: any) => void
  pullUp?: () => void
  pullDown?: () => void
  children?: React.ReactNode
}

const Scroll = forwardRef((props: Props, ref) => {
  const [bScroll, setBScroll] = useState<BScrollConstructor | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { direction, click, refresh, bounceTop, bounceBottom } = props
  const { pullUp, pullDown, onScroll } = props

  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current as HTMLDivElement, {
      scrollX: direction === 'horizontal', // 显示y轴滚动条
      scrollY: direction === 'vertical', // 显示x轴滚动条
      probeType: 3, // 任何时候都要派发scroll事件
      click, // 是否可使用原生点击
      bounce: {
        top: bounceTop, // 顶部是否回弹
        bottom: bounceBottom, // 底部是否回弹
      },
    })
    setBScroll(scroll)
    return () => {
      // 组件卸载时销毁实例
      scroll?.destroy()
      setBScroll(null)
    }
  }, [])

  useEffect(() => {
    if (refresh && bScroll && onScroll) {
      const hooks = bScroll.scroller.actions.hooks
      hooks.on('scroll', (scroll: any) => {
        onScroll(scroll)
      })

      return () => {
        // 移除'scroll'钩子监听器
        bScroll.off('scroll')
      }
    }
  }, [onScroll, bScroll])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    const hooks = bScroll.scroller.actions.hooks
    hooks.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp()
      }
    })
    return () => {
      bScroll.off('scrollEnd')
    }
  }, [pullUp, bScroll])

  useEffect(() => {
    if (!bScroll || !pullDown) return
    const hooks = bScroll.scroller.hooks
    hooks.on('touchEnd', (pos: any) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown()
      }
    })
    return () => {
      bScroll.off('touchEnd')
    }
  }, [pullDown, bScroll])

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    },
  }))

  return <ScrollContainer ref={scrollContainerRef}>{props.children}</ScrollContainer>
})

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceBottom: true,
  bounceTop: true,
}

export default Scroll
