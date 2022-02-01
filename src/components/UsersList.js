import React, { useEffect } from 'react'
import { fetchUsers, deleteUser } from '../redux/Users/users.actions'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

const UsersList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  // providing a list of users as an array instead of an object for the sake of making use of array methods
  const users = useSelector(state => Object.values(state.users))

  const renderUsers = users => {
    return (
      <div>
        {users.map(user => {
          return (
            <div key={user._id} className='card mb-3'>
              <div className='card-body d-flex justify-content-between'>
                <div>
                  <h5 className='card-title h3'>{user.name}</h5>
                  <h6 className='card-text'>
                    <i className='bi bi-envelope-fill'></i> {user.email}
                  </h6>
                  <h6 className='card-text'>
                    {' '}
                    <i className='bi bi-telephone-inbound-fill'></i>{' '}
                    {user.phone}
                  </h6>
                  <h6 className='card-text'>
                    {' '}
                    <i className='bi bi-house-door-fill'></i> {user.address}
                  </h6>
                </div>
                <div className='d-grid gap-2 col-2 '>
                  <Link
                    to={`/edit/${user._id}`}
                    className=' btn-lg btn btn-primary'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => dispatch(deleteUser(user._id))}
                    className='btn btn-danger '
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

  return <div className='container mt-3 col-sm-8'>{renderUsers(users)}</div>
}

export default UsersList
