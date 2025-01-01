import { useSearchParams } from 'react-router-dom'

export const useQueryString = () => {
  const [seachParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...seachParams])
  return searchParamsObject
}