import { Students } from "types/students.type"
import http from "utils/http"

export const getStudents = (_page: number | string, _limit: number | string) => {
  http.get<Students>('students', {
    params: {
      _page,
      _limit
    }
  })
}