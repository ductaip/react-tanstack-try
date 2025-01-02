import axios, { AxiosError } from 'axios'
import { useSearchParams } from 'react-router-dom'

export const useQueryString = () => {
  const [seachParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...seachParams])
  return searchParamsObject
}

export function isAxiosError<T>(error: unknown) : error is AxiosError<T> {
  return axios.isAxiosError(error)
} 