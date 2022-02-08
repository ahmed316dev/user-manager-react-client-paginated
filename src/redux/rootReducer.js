import { combineReducers } from 'redux'

import usersReducer from './Users/users.reducer'
import paginationReducer from './Pagination/pagination.reducer'
import validationReducer from './Validation/validation.reducer'
import searchReducer from './Query/query.reducer'
const rootReducer = combineReducers({
  users: usersReducer,
  pagination: paginationReducer,
  validation: validationReducer,
  search: searchReducer,
})

export default rootReducer
