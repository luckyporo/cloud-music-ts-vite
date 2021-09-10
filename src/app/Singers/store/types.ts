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

export type CategoryState = {
  category: string
  type: string
  area: string
  alpha: string
}

export type CategoryAction = {
  type: string
  payload: string
}
