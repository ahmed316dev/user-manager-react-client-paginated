import { combineReducers } from 'redux'

import usersReducer from './Users/users.reducer'

const rootReducer = combineReducers({
  users: usersReducer,
})

export default rootReducer
