import { FETCH_USERS, DELETE_USER, USER_TO_EDIT } from './users.types'

import api from '../../apis/api'

export const createUser = (formValues, navigate) => async dispatch => {
  if (formValues === { name: '', email: '', phone: '', address: '' }) return

  await api.post('/users', formValues)

  navigate('/')
}

export const fetchUsers =
  (limit = 5, currentPage = 1) =>
  async dispatch => {
    try {
      const response = await api.get(
        `users?limit=${limit}&currentPage=${currentPage}`
      )
      dispatch({
        type: FETCH_USERS,
        payload: response.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

export const updateUser = (formValues, userId, navigate) => async dispatch => {
  try {
    await api.patch(`/users/${userId}`, formValues)
    // navigate is called here instead of in the submit handling function for the purpose of programmatically navigating admin back to Home only if the POST request goes throguh

    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = (userId, navigate = null) => {
  try {
    // users.delete('/delete.php', { data: userId })
    const deleted = api.delete(`/users/${userId}`)
    // navigate is called here instead of in the submit handling function for the purpose of programmatically navigating admin back to Home only if the POST request goes throguh
    // if (navigate) setTimeout(() => navigate('/'), 500)
    if (navigate && deleted) setTimeout(() => navigate('/'), 300)

    return {
      type: DELETE_USER,
      payload: userId,
    }
  } catch (error) {
    console.log(error)
  }
}

export const userToEdit = userId => async dispatch => {
  const response = await api.get(`/users/user/${userId}`)

  dispatch({
    type: USER_TO_EDIT,
    payload: response.data,
  })
}
