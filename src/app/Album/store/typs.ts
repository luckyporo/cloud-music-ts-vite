export type Track = {
  name: string
  ar: {
    name: string
  }[]
  al: {
    name: string
  }
}

export interface Album {
  creator: {
    avatarUrl: string
    nickname: string
  }
  coverImgUrl: string
  subscribedCount: number
  name: string
  tracks: Track[]
}

export type AlbumState = {
  currentAlbum: Album
  enterLoading: boolean
}
