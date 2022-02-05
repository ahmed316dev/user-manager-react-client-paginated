import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getCount,
  setCurrentPage,
} from '../redux/Pagination/pagination.actions'
import { fetchUsers } from '../redux/Users/users.actions'

const Pagination = () => {
  const dispatch = useDispatch()
  const { count, limit, currentPage } = useSelector(state => state.pagination)
  useEffect(() => {
    // dispatch(getCount())
    dispatch(fetchUsers(limit, currentPage))
  }, [dispatch, currentPage, limit])

  useEffect(() => {
    dispatch(setCurrentPage(1))
  }, [dispatch, limit])

  const numberOfPages = Math.ceil(count / limit)
  const pageItems = []
  ;(() => {
    for (let i = 1; i <= numberOfPages; i++) {
      pageItems.push(
        <li key={i} className={`page-item ${currentPage === i ? '' : ''}`}>
          <button
            className={`page-link ${
              currentPage === i ? 'bg-primary text-white' : 'bg-dark text-white'
            }`}
            onClick={() => dispatch(setCurrentPage(i))}
          >
            {i}
          </button>
        </li>
      )
    }
  })()
  return (
    <nav aria-label="Page navigation example ">
      <ul className="pagination justify-content-center">
        <li className={`page-item  ${currentPage <= 1 ? 'disabled' : ''}`}>
          <button
            className={`page-link  bg-dark ${
              currentPage <= 1 ? 'text-muted' : 'text-warning'
            }`}
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            tabIndex="-1"
          >
            Previous
          </button>
        </li>
        {pageItems}
        <li
          className={`page-item ${
            currentPage >= numberOfPages ? 'disabled' : ''
          }`}
        >
          <button
            className={`page-link bg-dark ${
              currentPage >= numberOfPages ? 'text-muted' : 'text-warning'
            }`}
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
