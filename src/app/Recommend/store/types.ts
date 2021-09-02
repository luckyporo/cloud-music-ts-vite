export type Banner = {
  imageUrl: string
  url: string
}
export type Recommend = {
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
