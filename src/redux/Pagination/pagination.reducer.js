import {
  SET_LIMIT,
  SET_CURRENT_PAGE,
  SET_PAGES_START_INDEX,
  SET_PAGES_END_INDEX,
} from './paginatoin.types'

const paginationReducer = (state = { limit: 5, currentPage: 1 }, action) => {
  switch (action.type) {
    case SET_LIMIT:
      return { ...state, limit: action.payload }

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }

    case SET_PAGES_START_INDEX:
      return { ...state, ...action.payload }

    case SET_PAGES_END_INDEX:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
export default paginationReducer
