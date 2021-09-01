import useSWR from "swr"
import { axiosInstance } from "./config"

export function useBanner() {
  const fetcher =(url: string) => axiosInstance.get(url).then(res => res.data)
  const { data, error } = useSWR('/banner', fetcher)

  return {
    Banner: data,
    isLoading: !error && !data,
    isError: error
  }
}