import React, { useEffect } from 'react'
import { fetchUsers, deleteUser } from '../redux/Users/users.actions'
import { getCount } from '../redux/Pagination/pagination.actions'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import Pagination from './Pagination'
import DropdownMenu from './DropdownMenu'

const UsersList = () => {
  const dispatch = useDispatch()

  // providing a list of users as an array instead of an object for the sake of making use of array methods
  const users = useSelector(state => state.users)
  const { count } = useSelector(state => state.pagination)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getCount())
  }, [dispatch, users])

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
                <div className="d-grid gap-2 col-2 ">
                  <Link
                    to={`/edit/${user._id}`}
                    className=" btn-lg btn btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => dispatch(deleteUser(user._id))}
                    className="btn btn-danger "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (!users[0]) {
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
    <div className="container mt-3 col-sm-8">
      <DropdownMenu />
      {`${count} users`}
      {renderUsers(users)}
      <Pagination
      // pages={pages}
      // isActive={isActive}
      // changePageHandler={changePageHandler}
      />{' '}
    </div>
  )
}

export default UsersList
