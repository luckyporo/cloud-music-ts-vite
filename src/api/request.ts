import { Banner, Recommend } from "../application/Recommend/store/data";
import { axiosInstance } from "./config"

export const getBannerRequest = (): Promise<{ banners: Banner[] }> => {
  return axiosInstance.get('/banner');
}

export const getRecommendListRequest = (): Promise<{ result: Recommend[] }> => {
  return axiosInstance.get('/personalized');
}