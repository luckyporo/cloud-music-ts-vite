import axios from 'axios'
import { Banner, Recommend } from "@/app/Recommend/store/types"

export const BASE_URL = 'https://netease-cloud-music-api-luckyporo.vercel.app'

//axios 的实例及拦截器配置
const instance = axios.create({
  baseURL: BASE_URL,
})

instance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, "网络错误")
  }
)

export const getBannerListRequest = (): Promise<{ banners: Banner[] }> => {
  return instance.get('/banner');
}

export const getRecommendListRequest = (): Promise<{ result: Recommend[] }> => {
  return instance.get('/personalized');
}