import { SET_SEARCH_TEXT, SET_SEARCH_BY } from './query.types'

const searchReducer = (
  state = { searchText: '', searchBy: { byName: true, byEmail: false } },
  action
) => {
  switch (action.type) {
    case SET_SEARCH_BY:
      return { ...state, searchBy: action.payload }

    case SET_SEARCH_TEXT:
      return { ...state, searchText: action.payload }

    default:
      return state
  }
}

export default searchReducer
