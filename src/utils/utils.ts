export type PartialOptional<T, K extends keyof T> = {
  [P in K]?: T[P]
}

export type ReturnElementType<T extends unknown[]> = T extends (infer U)[] ? U : never

export const getCount = (count: number): number | string => {
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}

export const getName = (list: { name: string }[]) => {
  let str = ''
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name
    return item
  })
  return str
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (func: () => any, delay: number): (() => any) => {
  let timer: NodeJS.Timeout
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
      clearTimeout(timer)
    }, delay)
  }
}
