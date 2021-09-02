export type Banner = {
  imageUrl: string;
  url: string;
}
export type Recommend = {
  name: string;
  picUrl: string;
  trackCount: number;
  playCount: number;
}

export interface RecommendState {
  bannerList: Banner[]
  recommendList: Recommend[]
  enterLoading: boolean
}