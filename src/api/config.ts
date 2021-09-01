import axios from 'axios'

export const baseUrl = 'https://vercel.com/luckyporo/netease-cloud-music-api'

//axios 的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: baseUrl
})

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, "网络错误")
  }
)

export {
  axiosInstance
}