import { useQuery } from '@tanstack/react-query'
import { getStudents } from 'apis/students.api'
import classNames from 'classnames'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Student, Students as studentType } from 'types/students.type'
import { useQueryString } from 'utils/utils'

const LIMIT = 10
export default function Students() { 
  //query string
  const queryString : {page?: string} = useQueryString()
  const page = Number(queryString.page) || 1

  //fetch students by using useQuery
  const {data, isLoading} = useQuery({
    queryKey: ['students', page], //deep comparison
    queryFn: () => getStudents(page , LIMIT),
    keepPreviousData: true
  })

  const totalStudentsCount = Number(data?.headers['x-total-count']) || 0
  const totalPage = Math.ceil(totalStudentsCount / LIMIT)
  
  return (
    <div>
      <h1 className='text-lg'>Students</h1>

      <div>
        <Link to='/students/add' type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</Link>
      </div>

      {isLoading ? <div role='status' className='mt-6 animate-pulse'>
        <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <span className='sr-only'>Loading...</span>
      </div>
      : <Fragment>
        <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='py-3 px-6'>
                  #
                </th>
                <th scope='col' className='py-3 px-6'>
                  Avatar
                </th>
                <th scope='col' className='py-3 px-6'>
                  Name
                </th>
                <th scope='col' className='py-3 px-6'>
                  Email
                </th>
                <th scope='col' className='py-3 px-6'>
                  <span className='sr-only'>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((student, index) => (
                <tr key={index} className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
                <td className='py-4 px-6'>{(page - 1) * 10 + index + 1}</td>
                <td className='py-4 px-6'>
                  <img
                    src={student.avatar}
                    alt='student'
                    className='h-5 w-5'
                  />
                  </td>
                  <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                    {student.last_name}
                  </th>
                  <td className='py-4 px-6'>{student.email}</td>
                  <td className='py-4 px-6 text-right'>
                    <Link to= {`/students/${(page - 1) * 10 + index + 1}`} className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'>
                      Edit
                    </Link>
                    <button className='font-medium text-red-600 dark:text-red-500'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='mt-6 flex justify-center'>
        <nav aria-label='Page navigation example'>
          <ul className='inline-flex -space-x-px'>
            <li>
              {page === 1 ? (<span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                Previous
              </span>) : 
              <Link className='rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' to={`/students?page=${page-1}`}>
                  Previous
              </Link>}
            </li>
            {Array(totalPage).fill(0).map((_, index) => (
              <li key={index+1}>
              <Link
                className={classNames('border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 text-gray-500  hover:bg-gray-100 hover:bg-gray-100 hover:text-gray-700 hover:text-gray-700', {
                  'bg-gray-400 text-gray-700': page === index + 1,
                })}
                to={`/students?page=${index + 1}`}
              >
                {index + 1}
              </Link>
            </li>
            ))}
            <li>
              <Link
                className={classNames('rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white', {
                  'cursor-not-allowed': page === totalPage,
                })}
                to={`/students?page=${page+1}`}
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      : </Fragment>}
    </div>
  )
}
