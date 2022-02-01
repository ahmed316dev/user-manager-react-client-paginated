import { FETCH_USERS, DELETE_USER } from './users.types'

import users from '../../apis/users'

export const createUser = (formValues, navigate) => async dispatch => {
  if (formValues === { name: '', email: '', phone: '', address: '' }) return

  await users.post('/users', formValues)

  navigate('/')
}

export const fetchUsers = () => async dispatch => {
  try {
    const response = await users.get('/users')

    dispatch({
      type: FETCH_USERS,
      payload: Object.entries(response.data).reduce(
        (p, [k, v]) => ({ ...p, [v._id]: v }),
        {}
      ),
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = (formValues, userId, navigate) => async dispatch => {
  try {
    await users.patch(`/users/${userId}`, formValues)

    // navigate is called here instead of in the submit handling function for the purpose of programmatically navigating admin back to Home only if the POST request goes throguh
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = (userId, navigate = null) => {
  try {
    // users.delete('/delete.php', { data: userId })

    users.delete(`/users/${userId}`)

    // navigate is called here instead of in the submit handling function for the purpose of programmatically navigating admin back to Home only if the POST request goes throguh
    if (navigate) navigate('/')

    return {
      type: DELETE_USER,
      payload: userId,
    }
  } catch (error) {
    console.log(error)
  }
}
