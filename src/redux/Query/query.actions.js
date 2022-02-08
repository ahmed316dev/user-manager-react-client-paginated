import { SET_SEARCH_TEXT, SET_SEARCH_BY } from './query.types'

export const setSearchText = searchText => {
  return {
    type: SET_SEARCH_TEXT,
    payload: searchText,
  }
}

export const setSearchBy = ({ byName, byEmail }) => {
  return {
    type: SET_SEARCH_BY,
    payload: { byName, byEmail },
  }
}
