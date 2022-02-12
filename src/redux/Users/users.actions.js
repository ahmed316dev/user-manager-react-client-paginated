import { FETCH_USERS, DELETE_USER, USER_TO_EDIT } from './users.types'

import api from '../../apis/api'

export const createUser = (formValues, navigate) => async dispatch => {
  if (formValues === { name: '', email: '', phone: '', address: '' }) return

  await api.post('/user/create.php', formValues)

  navigate('/')
}

export const fetchUsers =
  (
    limit = 5,
    currentPage = 1,
    searchText = '',
    byName = true,
    byEmail = false
  ) =>
  async dispatch => {
    try {
      const response = await api.get(
        `user/read.php?searchText=${searchText}&limit=${limit}&currentPage=${currentPage}&byName=${byName}&byEmail=${byEmail}`
      )
      dispatch({
        type: FETCH_USERS,
        payload: response.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

// export const fetchUsersBySearch =
//   ({ limit, currentPage, searchText, searchBy: { name, email } }) =>
//   async dispatch => {
//     const response = await api.get(
//       `/users/fetchusersbysearch?searchText=${searchText}&limit=${limit}&currentPage=${currentPage}&name=${name}&email=${email}`
//     )

//     dispatch({ type: FETCH_USERS, payload: response.data })
//   }
export const updateUser = (formValues, userId, navigate) => async dispatch => {
  try {
    const response = await api.put('user/update.php', { ...formValues, userId })
    // navigate is called here instead of in the submit handling function for the purpose of programmatically navigating admin back to Home only if the POST request goes throguh
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = (userId, navigate = null) => {
  try {
    const deleted = api.delete('/user/delete.php', { data: { userId } })
    // navigate is called here instead of in the submit handling function for the purpose of programmatically navigating admin back to Home only if the POST request goes throguh
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
  const response = await api.get(`/user/read_single.php?userId=${userId}`)

  dispatch({
    type: USER_TO_EDIT,
    payload: response.data,
  })
}
