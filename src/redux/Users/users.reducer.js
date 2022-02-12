import { FETCH_USERS, DELETE_USER, USER_TO_EDIT } from './users.types'

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      const { users, count } = action.payload
      return { count, users: [...users] }

    case DELETE_USER:
      const filteredUsers = state.users.filter(
        user => user._id !== action.payload
      )
      return { count: state.count - 1, users: filteredUsers }

    case USER_TO_EDIT:
      return { userToEdit: action.payload }
    default:
      return state
  }
}

export default usersReducer
