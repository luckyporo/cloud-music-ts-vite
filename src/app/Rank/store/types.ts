export interface Rank {
  id: string
  name: string
  playCount: number
  coverImgUrl: string
  description: string
  coverImgId: string
  subscribedCount: number
  tracks: {
    first: string
    second: string
  }[]
}
