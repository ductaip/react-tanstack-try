import { Student, Students } from "types/students.type"
import http from "utils/http"

export const getStudents = (_page: number | string, _limit: number | string) => 
  http.get<Students>('students', {
    params: {
      _page,
      _limit
    }
})

export const getStudent = (id: number | string) => http.get<Student>(`students/${id}`)

export const addStudent = (student: Omit<Student, 'id'>) => http.post<Student>('/students', student)
