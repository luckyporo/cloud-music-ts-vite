export type Track = {
  first: string
  second: string
}

export interface RankList {
  id: string
  name: string
  playCount: number
  coverImgUrl: string
  description: string
  coverImgId: string
  subscribedCount: number
  updateFrequency: string
  tracks: Track[]
}

export type RankState = {
  rankList: RankList[]
  loading: boolean
}
