import { FETCH_USERS, DELETE_USER } from './users.types'

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER:
      const newObj = { ...state }
      delete newObj[action.payload]
      return { ...newObj }

    case FETCH_USERS:
      const allUsers = action.payload
      return { ...state, ...allUsers }

    default:
      return state
  }
}

export default usersReducer
