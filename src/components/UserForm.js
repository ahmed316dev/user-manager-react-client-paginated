import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'

import {
  createUser,
  updateUser,
  // fetchUsers,
  userToEdit as userToEditAction,
  deleteUser,
} from '../redux/Users/users.actions'
import {
  isEmailUnique as isEmailUniqueAction,
  // isPhoneUnique as isPhoneUniqueAction,
} from '../redux/Validation/validation.actions'

const UserForm = props => {
  const { currentId } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if (currentId) dispatch(userToEditAction(currentId))
    
  }, [dispatch, currentId])
  
  const {userToEdit} = useSelector(state => state.users)

  // THIS CAUSES "IS_EMAIL_UNIQUE" TO DISPATCH NON-stop
  // const {isEmailUnique} = useSelector(state => state.validation)
  // checking if admin is trying to create a new user or update an existing one

  // grabs all the data from the user admin is trying to update
  // const userToEdit = users.find(user => user._id === currentId)
  // Dispatching actions depending on whether the admin is creating a user or updating an existing one
  const onSubmit = formValues => {
    if (userToEdit) dispatch(updateUser(formValues, currentId, navigate))
    else if (!userToEdit) dispatch(createUser(formValues, navigate))
  }

  const validate = ({name, email, phone, address}) =>{
    const error = { }
    dispatch(isEmailUniqueAction("sodyzeq@mailinator.com"))

    if(! name) error.name= "You must enter a name"
    if(! email) error.email= "You must enter an email"
    if(! phone) error.phone= "You must enter a phone"
    if(! address) error.address= "You must enter an address"
    // if()

    return error
  }
 

  return (
    <div className="container col-sm-4 mt-3 ">
      <h1>{userToEdit ? 'Edit User' : 'Create User'}</h1>

      <Form
        initialValues={userToEdit}
        validate={validate}
        onSubmit={onSubmit}
        
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  render={({ input, meta }) => {
                    return (
                      <div className="input-group">
                        <span className="bg-dark border-dark input-group-text">
                          {' '}
                          <i className="text-muted bi  bi-person-fill"></i>
                        </span>
                        <input
                          className="bg-dark border-dark form-control text-white"
                          {...input}
                          placeholder="Enter Name"
                          id="name"
                        />
                        <span className="invalid-feedback d-block">
                          {' '}
                          {meta.error && meta.touched ? meta.error : ''}
                        </span>
                      </div>
                    )
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  render={({ input, meta }) => {
                    return (
                      <div className="input-group">
                        <span className="bg-dark border-dark input-group-text">
                          {' '}
                          <i className="text-muted bi  bi-envelope-fill"></i>
                        </span>
                        <input
                          className="bg-dark border-dark form-control text-white"
                          {...input}
                          placeholder="Enter Email"
                          id="email"
                        />
                        {/* rendering error */}
                        <span className="invalid-feedback d-block">
                          {' '}
                          {meta.error && meta.touched ? meta.error : ''}
                        </span>
                      </div>
                    )
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone">Phone</label>
                <Field
                  name="phone"
                  render={({ input, meta }) => {
                    return (
                      <div className="input-group">
                        <span className="bg-dark border-dark input-group-text">
                          {' '}
                          <i className="text-muted bi  bi-telephone-inbound-fill"></i>
                        </span>
                        <input
                          className="bg-dark border-dark form-control text-white"
                          {...input}
                          placeholder="Enter Phone"
                          id="phone"
                        />
                        {/* rendering error */}
                        <span className="invalid-feedback d-block">
                          {' '}
                          {meta.error && meta.touched ? meta.error : ''}
                        </span>
                      </div>
                    )
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <Field
                  name="address"
                  render={({ input, meta }) => {
                    return (
                      <div className="input-group">
                        <span className="bg-dark border-dark input-group-text">
                          {' '}
                          <i className="text-muted bi  bi-house-fill"></i>
                        </span>
                        <input
                          className="bg-dark border-dark form-control text-white"
                          {...input}
                          placeholder="Enter Address"
                          id="address"
                        />
                        {/* rendering error */}
                        <span className="invalid-feedback d-block">
                          {' '}
                          {meta.error && meta.touched ? meta.error : ''}
                        </span>
                      </div>
                    )
                  }}
                />
              </div>

              <div className="d-flex justify-content-between">
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary mb-3">
                    {userToEdit ? 'Edit User' : 'Create User'}
                  </button>
                </div>

                <div className="col-auto">
                  {userToEdit ? (
                    <button
                      type="button"
                      onClick={() => dispatch(deleteUser(currentId, navigate))}
                      className="btn btn-danger "
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
