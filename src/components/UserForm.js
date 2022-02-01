import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'

import {
  createUser,
  updateUser,
  fetchUsers,
  deleteUser,
} from '../redux/Users/users.actions'

const UserForm = props => {
  const { currentId } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  // checking if admin is trying to create a new user or update an existing one
  const isUpdate = Object.values(users).find(user => user._id === currentId)

  // grabs all the data from the user admin is trying to update
  const userToEdit = Object.values(users).find(user => user._id === currentId)

  // Dispatching actions depending on whether the admin is creating a user or updating an existing one
  const onSubmit = formValues => {
    if (isUpdate) dispatch(updateUser(formValues, currentId, navigate))
    else if (!isUpdate) dispatch(createUser(formValues, navigate))
  }

  // Final Form validation function
  const validate = ({ name, email, phone, address }) => {
    const error = {}

    const emailExists = email =>
      !isUpdate && Object.values(users).find(user => user.email === email)
    const phoneExists = phone =>
      !isUpdate && Object.values(users).find(user => user.phone === phone)
    const emailIsValid = email =>
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        email
      )
    const phoneIsValid = phone =>
      /^\D*(\d\D*){6,15}$/.test(phone) ? true : false

    const usersWithoutCurrentUsers = Object.values(users).filter(
      user => user._id !== currentId
    )

    // checks if admin has provided email/phone that don't belong to another user
    const editToUniqueEmail = email =>
      isUpdate &&
      !Object.values(usersWithoutCurrentUsers).find(
        user => user.email === email
      )
    const editToUniquePhone = phone =>
      isUpdate &&
      !Object.values(usersWithoutCurrentUsers).find(
        user => user.phone === phone
      )

    if (!name) error.name = 'You must enter a name'
    if (!email) error.email = 'You must enter an email'
    else if (emailExists(email))
      error.email = 'This email belongs to an existing user'
    else if (!emailIsValid(email)) error.email = 'You must enter a valid email'
    else if (!editToUniqueEmail(email) && isUpdate)
      error.email = `You can edit user email, but this one belongs to another user that isn't ${name} `
    if (!phone) error.phone = 'You must enter a phone'
    else if (phoneExists(phone))
      error.phone = 'This phone belongs to an existing user'
    else if (!phoneIsValid(phone)) error.phone = 'You must enter a valid phone'
    else if (!editToUniquePhone(phone) && isUpdate)
      error.phone = `You can edit user phone, but this one belongs to another user that isn't ${name} `
    if (!address) error.address = 'You must enter an address'
    return error
  }

  return (
    <div className='container col-sm-4 mt-3 '>
      <h1>{isUpdate ? 'Edit User' : 'Create User'}</h1>

      <Form
        initialValues={userToEdit}
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='name'>Name</label>
                <Field
                  name='name'
                  render={({ input, meta }) => {
                    return (
                      <div className='input-group'>
                        <span className='input-group-text'>
                          {' '}
                          <i className='bi bi-person-fill'></i>
                        </span>
                        <input
                          className='form-control'
                          {...input}
                          placeholder='Enter Name'
                          id='name'
                        />
                        <span className='invalid-feedback d-block'>
                          {' '}
                          {meta.error && meta.touched ? meta.error : ''}
                        </span>
                      </div>
                    )
                  }}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='email'>Email</label>
                <Field
                  name='email'
                  render={({ input, meta }) => {
                    return (
                      <div className='input-group'>
                        <span className='input-group-text'>
                          {' '}
                          <i className='bi bi-envelope-fill'></i>
                        </span>
                        <input
                          className='form-control'
                          {...input}
                          placeholder='Enter Email'
                          id='email'
                        />
                        {/* rendering error */}
                        <span className='invalid-feedback d-block'>
                          {' '}
                          {meta.error && meta.touched ? meta.error : ''}
                        </span>
                      </div>
                    )
                  }}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='phone'>Phone</label>
                <Field
                  name='phone'
                  render={({ input, meta }) => {
                    return (
                      <div className='input-group'>
                        <span className='input-group-text'>
                          {' '}
                          <i className='bi bi-telephone-inbound-fill'></i>
                        </span>
                        <input
                          className='form-control'
                          {...input}
                          placeholder='Enter Phone'
                          id='phone'
                        />
                        {/* rendering error */}
                        <span className='invalid-feedback d-block'>
                          {' '}
                          {meta.error && meta.touched ? meta.error : ''}
                        </span>
                      </div>
                    )
                  }}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='address'>Address</label>
                <Field
                  name='address'
                  render={({ input, meta }) => {
                    return (
                      <div className='input-group'>
                        <span className='input-group-text'>
                          {' '}
                          <i className='bi bi-house-fill'></i>
                        </span>
                        <input
                          className='form-control'
                          {...input}
                          placeholder='Enter Address'
                          id='address'
                        />
                        {/* rendering error */}
                        <span className='invalid-feedback d-block'>
                          {' '}
                          {meta.error && meta.touched ? meta.error : ''}
                        </span>
                      </div>
                    )
                  }}
                />
              </div>

              <div className='d-flex justify-content-between'>
                <div className='col-auto'>
                  <button type='submit' className='btn btn-primary mb-3'>
                    {isUpdate ? 'Edit User' : 'Create User'}
                  </button>
                </div>

                <div className='col-auto'>
                  {isUpdate ? (
                    <button
                      type='button'
                      onClick={() => dispatch(deleteUser(currentId, navigate))}
                      className='btn btn-danger '
                    >
                      Delete User
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </form>
          )
        }}
      />
    </div>
  )
}

export default UserForm
