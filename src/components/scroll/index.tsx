import BScroll from '@better-scroll/core'
import { BScrollInstance } from '@better-scroll/core/dist/types'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import Loading from '@/layout/loading'
import LoadingV2 from '@/layout/loading-v2'
import { debounce } from '@/utils/utils'

import { PullDownLoading, PullUpLoading, ScrollContainer } from './style'

type Props = {
  direction?: 'vertical' | 'horizontal'
  click?: boolean
  refresh?: boolean
  pullUpLoading?: boolean
  pullDownLoading?: boolean
  bounceTop?: boolean
  bounceBottom?: boolean
  onScroll?: (() => void) | ((instance: BScrollInstance) => void)
  pullUp?: () => void
  pullDown?: () => void
  children: React.ReactNode
}

const Scroll = forwardRef(
  (
    {
      direction = 'vertical',
      click = true,
      refresh = true,
      bounceTop = true,
      bounceBottom = true,
      pullDownLoading,
      pullUpLoading,
      pullUp = () => {
        return
      },
      pullDown = () => {
        return
      },
      onScroll,
      children,
    }: Props,
    ref,
  ) => {
    const [bScroll, setBScroll] = useState<BScrollInstance | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

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
        bScroll.on('scroll', (instance: BScrollInstance) => {
          onScroll(instance)
        })

        return () => {
          // 移除'scroll'钩子监听器
          bScroll.off('scroll')
        }
      }
    }, [onScroll, bScroll])

    const pullUpDebounce = useMemo(() => {
      return debounce(pullUp, 300)
    }, [pullUp])

    useEffect(() => {
      if (!bScroll || !pullUp) return
      bScroll.on('scrollEnd', () => {
        // 判断是否滑动到了底部
        if (bScroll.y <= bScroll.maxScrollY + 100) {
          pullUpDebounce()
        }
      })
      return () => {
        bScroll.off('scrollEnd')
      }
    }, [pullUp, pullUpDebounce, bScroll])

    const pullDownDebounce = useMemo(() => {
      return debounce(pullDown, 300)
    }, [pullDown])

    useEffect(() => {
      if (!bScroll || !pullDown) return
      bScroll.on('touchEnd', (pos: BScrollInstance) => {
        // 判断用户的下拉动作
        if (pos.y > 50) {
          pullDownDebounce()
        }
      })
      return () => {
        bScroll.off('touchEnd')
      }
    }, [pullDown, pullDownDebounce, bScroll])

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

    const PullUpDisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' }
    const PullDownDisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' }

    return (
      <ScrollContainer ref={scrollContainerRef}>
        {children}
        {/* 滑动到底部的loading动画 */}
        <PullUpLoading style={PullUpDisplayStyle}>
          <Loading></Loading>
        </PullUpLoading>
        {/* 顶部上拉刷新loading动画 */}
        <PullDownLoading style={PullDownDisplayStyle}>
          <LoadingV2></LoadingV2>
        </PullDownLoading>
      </ScrollContainer>
    )
  },
)

export default Scroll
