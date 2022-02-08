import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchBy, setSearchText } from '../redux/Query/query.actions'

const SearchBar = () => {
  const dispatch = useDispatch()

  const { searchText, searchBy } = useSelector(state => state.search)

  useEffect(() => {
    if (!searchBy.byEmail && !searchBy.byName) {
      dispatch(setSearchBy({ byName: true, byEmail: false }))
    }
  }, [dispatch, searchBy])

  return (
    <div className="col-8">
      <div className="input-group mb-3">
        <div className="btn-group ">
          <button
            onClick={() =>
              dispatch(setSearchBy({ ...searchBy, byName: !searchBy.byName }))
            }
            className={`btn text-white  ${
              searchBy.byName ? 'bg-primary' : 'bg-secondary'
            }`}
          >
            Name
          </button>
          <button
            onClick={() =>
              dispatch(setSearchBy({ ...searchBy, byEmail: !searchBy.byEmail }))
            }
            className={`btn text-white  ${
              searchBy.byEmail ? 'bg-primary' : 'bg-secondary'
            }`}
          >
            Email
          </button>
        </div>
        <div className="col-8">
          <input
            value={searchText}
            onChange={e => dispatch(setSearchText(e.target.value))}
            type="text"
            className="form-control bg-dark border-dark text-white"
            placeholder={`Search Users by ${searchBy.byName ? 'Name' : ''}${
              searchBy.byName && searchBy.byEmail ? ' & ' : ''
            }${searchBy.byEmail ? 'Email' : ''}`}
          />
        </div>
        <button
          onClick={() => {
            dispatch(setSearchText(''))
            dispatch(setSearchBy({ byName: true, byEmail: false }))
          }}
          type="submit"
          className={`btn btn-danger ${searchText ? '' : 'd-none'}`}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default SearchBar
