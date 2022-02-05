import { combineReducers } from 'redux'

import usersReducer from './Users/users.reducer'
import paginationReducer from './Pagination/pagination.reducer'
import validationReducer from './Validation/validation.reducer'
const rootReducer = combineReducers({
  users: usersReducer,
  pagination: paginationReducer,
  validation: validationReducer,
})

export default rootReducer
