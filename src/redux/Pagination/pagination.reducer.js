import { GET_COUNT, SET_LIMIT, SET_CURRENT_PAGE } from './paginatoin.types'

const paginationReducer = (state = { limit: 5, currentPage: 1 }, action) => {
  switch (action.type) {
    case GET_COUNT:
      return { ...state, count: action.payload }

    case SET_LIMIT:
      return { ...state, limit: action.payload }

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }

    default:
      return state
  }
}
export default paginationReducer
