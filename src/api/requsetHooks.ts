import useSWR from "swr"
import { axiosInstance } from "./config"

export function useBanner() {
  const fetcher =(url: string) => axiosInstance.get(url).then(res => res.data)
  const { data, error } = useSWR('/banner', fetcher)

  return {
    banner: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useRecommendList() {
  const fetcher =(url: string) => axiosInstance.get(url).then(res => res.data)
  const { data, error } = useSWR('/personalized', fetcher)

  return {
    recommendList: data,
    isLoading: !error && !data,
    isError: error
  }
}