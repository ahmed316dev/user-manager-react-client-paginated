import { FETCH_USERS, DELETE_USER } from './users.types'

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      const allUsers = action.payload
      return { ...state, ...allUsers }

    case DELETE_USER:
      delete state[action.payload]
      return { ...state }

    default:
      return state
  }
}

export default usersReducer
