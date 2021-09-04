export interface Singer {
  name: string
  picUrl: string
  accountId: string
}

export type SingersState = {
  singerList: Singer[]
  enterLoading: boolean
  pullUpLoading: boolean
  pullDownLoading: boolean
  pageCount: number
}
