import { FETCH_USERS, DELETE_USER, USER_TO_EDIT } from './users.types'

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      const allUsers = action.payload
      return [...allUsers]

    case DELETE_USER:
      const filteredUsers = state.filter(user => user._id !== action.payload)
      return [...filteredUsers]
      
    case USER_TO_EDIT:
      return { userToEdit: action.payload[0] }
    default:
      return state
  }
}

export default usersReducer
