import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setCurrentPage,
  setPageStartIndex,
  setPageEndIndex,
} from '../redux/Pagination/pagination.actions'

const Pagination = () => {
  const dispatch = useDispatch()
  const { limit, currentPage } = useSelector(state => state.pagination)
  const { count } = useSelector(state => state.users)
  const { pageStartIndex, pageEndIndex } = useSelector(
    state => state?.pagination
  )
  const numberOfPages = Math.ceil(count / limit)

  useEffect(() => {
    dispatch(setCurrentPage(1))
  }, [dispatch, limit])

  useEffect(() => {
    dispatch(setPageStartIndex(0))
    dispatch(setPageEndIndex(4))
  }, [dispatch])

  useEffect(() => {
    if (currentPage === pageEndIndex) {
      dispatch(setPageEndIndex(pageStartIndex + 4))
      dispatch(setPageStartIndex(pageStartIndex + 1))
    }
    if (currentPage === 1) {
      dispatch(setPageStartIndex(0))
      dispatch(setPageEndIndex(4))
    }

    if (currentPage === numberOfPages || currentPage === numberOfPages - 1) {
      dispatch(setPageStartIndex(numberOfPages - 3))
      dispatch(setPageEndIndex(pageStartIndex + 3))
    }

    if (currentPage !== 1 && currentPage === pageStartIndex + 1) {
      dispatch(setPageEndIndex(pageEndIndex - 1))
      dispatch(setPageStartIndex(pageStartIndex - 1))
    }
  }, [dispatch, currentPage, pageStartIndex, pageEndIndex, numberOfPages])

  const pages = []

  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i)
  }

  //   if (currentPage === 2) dispatch(setPagesToView(0, 4))
  const pagesSliced = pages.slice(pageStartIndex, pageEndIndex)
  const renderPages = () => {
    return pagesSliced.map(page => {
      if (page === 1 || page === numberOfPages) return null
      return (
        <li key={page} className={`page-item`}>
          <button
            className={`page-link ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'bg-dark text-white'
            }`}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </button>
        </li>
      )
    })
  }

  return (
    <nav aria-label="Page navigation  example ">
      <ul
        className={`${
          count <= limit ? 'd-none' : ''
        } pagination justify-content-center`}
      >
        {/* Previous button */}
        <li className={`page-item  ${currentPage <= 1 ? 'disabled' : ''}`}>
          <button
            className={`page-link  bg-dark ${
              currentPage <= 1 ? 'text-muted' : 'text-warning'
            }`}
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            tabIndex="-1"
          >
            <i className="bi bi-arrow-left"></i>
          </button>
        </li>

        {/* first page */}
        <li className={`page-item`}>
          <button
            className={`page-link ${
              currentPage === 1 ? 'bg-primary text-white' : 'bg-dark text-white'
            }`}
            onClick={() => dispatch(setCurrentPage(1))}
          >
            1
          </button>
        </li>

        {/* dots */}

        <li className={`page-item disabled ${currentPage < 4 ? 'd-none' : ''}`}>
          <button className={`page-link bg-dark text-muted `}>...</button>
        </li>

        {renderPages()}

        {/* dots */}
        <li
          className={`page-item disabled ${
            currentPage > numberOfPages - 3 ? 'd-none' : ''
          }`}
        >
          <button className={`page-link bg-dark text-muted `}>...</button>
        </li>

        {/* last page */}

        <li className={`page-item`}>
          <button
            className={`page-link ${
              currentPage === numberOfPages
                ? 'bg-primary text-white'
                : 'bg-dark text-white'
            }`}
            onClick={() => dispatch(setCurrentPage(numberOfPages))}
          >
            {numberOfPages}
          </button>
        </li>

        {/* Next button */}
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
            <i className="bi bi-arrow-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
