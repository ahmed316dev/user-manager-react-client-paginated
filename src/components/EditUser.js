import React from 'react'
import UserForm from './UserForm'
import { useParams } from 'react-router-dom'

const EditUser = props => {
  const { id } = useParams()
  return <UserForm currentId={id} />
}

export default EditUser
