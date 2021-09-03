export type PartialOptional<T, K extends keyof T> = {
  [P in K]?: T[P]
}

export type ReturnElementType<T extends unknown[]> = T extends (infer U)[] ? U : never

export const getCount = (count: number): number | string | void => {
  if (count < 0) return
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}
