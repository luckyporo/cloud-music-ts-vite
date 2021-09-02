export interface Banner {
  imageUrl: string
  url: string
}
export interface Recommend {
  id: number
  name: string
  picUrl: string
  trackCount: number
  playCount: number
}

export type RecommendState = {
  bannerList: Banner[]
  recommendList: Recommend[]
  enterLoading: boolean
}
