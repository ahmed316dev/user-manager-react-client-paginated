import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLimit } from '../redux/Pagination/pagination.actions'

const ShowLimit = () => {
  const dispatch = useDispatch()
  const limit = useSelector(state => state.pagination.limit)
  return (
    <div>
      <div>
        Show{('  ', ' ')}
        <div className="btn-group">
          <button
            onClick={() => dispatch(setLimit(5))}
            className={`btn text-white  ${
              limit === 5 ? 'bg-primary' : 'bg-secondary'
            }`}
          >
            5
          </button>
          <button
            onClick={() => dispatch(setLimit(10))}
            className={`btn text-white  ${
              limit === 10 ? 'bg-primary' : 'bg-secondary'
            }`}
          >
            10
          </button>
          <button
            onClick={() => dispatch(setLimit(20))}
            className={`btn text-white  ${
              limit === 20 ? 'bg-primary' : 'bg-secondary'
            }`}
          >
            20
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowLimit
