import axios from 'axios'
import { env } from '../config/env'
import { clearToken, clearUserStorage, getToken } from './storage'

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000
})

http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearToken()
      clearUserStorage()
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
