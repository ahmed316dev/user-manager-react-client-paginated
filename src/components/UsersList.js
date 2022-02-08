import React, { useEffect } from 'react'
import { fetchUsers, deleteUser } from '../redux/Users/users.actions'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import Pagination from './Pagination'
import ShowLimit from './ShowLimit'
import SearchBar from './SearchBar'
import { setCurrentPage } from '../redux/Pagination/pagination.actions'

const UsersList = () => {
  const dispatch = useDispatch()

  // providing a list of users as an array instead of an object for the sake of making use of array methods
  const { users, count } = useSelector(state => state.users)

  const { limit, currentPage } = useSelector(state => state.pagination)

  const {
    searchText,
    searchBy: { byName, byEmail },
  } = useSelector(state => state.search)

  useEffect(() => {
    if (!searchText) {
      dispatch(fetchUsers(limit, currentPage))
    }
    if (searchText) {
      dispatch(fetchUsers(limit, currentPage, searchText, byName, byEmail))
    }
  }, [dispatch, searchText, limit, currentPage, byName, byEmail])

  useEffect(() => {
    dispatch(setCurrentPage(1))
  }, [dispatch, searchText])

  const renderUsers = users => {
    return (
      <div>
        {users.map(user => {
          return (
            <div key={user._id} className="card mb-3 bg-dark">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="card-title h3">{user.name}</h5>
                  <h6 className="card-text">
                    <i className="bi bi-envelope-fill"></i> {user.email}
                  </h6>
                  <h6 className="card-text">
                    {' '}
                    <i className="bi bi-telephone-inbound-fill"></i>{' '}
                    {user.phone}
                  </h6>
                  <h6 className="card-text">
                    {' '}
                    <i className="bi bi-house-door-fill"></i> {user.address}
                  </h6>
                </div>
                <div className="d-flex flex-column align-items-between mt-3 gap-2  col-lg-2 col-3">
                  <Link
                    to={`/edit/${user._id}`}
                    className=" p-1 m-0 btn btn-primary"
                  >
                    <i className=" bi bi-pencil-square"></i>
                  </Link>
                  <button
                    onClick={() => dispatch(deleteUser(user._id))}
                    className="btn p-0 m-0 btn-danger "
                  >
                    <i className=" bi h5 bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (!users) {
    return (
      <div className="d-flex justify-content-center  mt-4">
        <div
          className="spinner-border text-primary"
          style={{ width: '6rem', height: '6rem' }}
          role="status"
        ></div>
      </div>
    )
  }
  return (
    <div className="container mt-3 ">
      <div className="d-flex justify-content-between">
        <SearchBar />
        <ShowLimit />
      </div>
      {`${count} users`}
      {renderUsers(users)}
      <Pagination />
    </div>
  )
}

export default UsersList
