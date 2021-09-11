import axios from 'axios'

import { Rank } from '@/app/Rank/store/types'
import { Banner, Recommend } from '@/app/Recommend/store/types'
import { Singer } from '@/app/Singers/store/types'

export const BASE_URL = 'https://netease-cloud-music-api-luckyporo.vercel.app'

//axios 的实例及拦截器配置
const instance = axios.create({
  baseURL: BASE_URL,
})

instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err, '网络错误')
  },
)

export const getBannerListRequest = (): Promise<{ banners: Banner[] }> => {
  return instance.get('/banner')
}

export const getRecommendListRequest = (): Promise<{ result: Recommend[] }> => {
  return instance.get('/personalized')
}

export const getHotSingerListRequest = (
  count: number,
): Promise<{ artists: Singer[] }> => {
  return instance.get(`/top/artists?offset=${count}`)
}

export const getSingerListRequest = (
  type: string,
  area: string,
  alpha: string,
  count: number,
): Promise<{ artists: Singer[] }> => {
  return instance.get(
    `artist/list?offset=${count}${type ? '&type=' + type : ''}${
      area ? '&area=' + area : ''
    }${alpha ? '&initial=' + alpha.toLowerCase() : ''}`,
  )
}

export const getRankListRequest = (): Promise<{ list: Rank[] }> => {
  return instance.get('/toplist/detail')
}
