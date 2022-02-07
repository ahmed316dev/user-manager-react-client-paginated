import {
  GET_COUNT,
  SET_LIMIT,
  SET_CURRENT_PAGE,
  SET_PAGES_START_INDEX,
  SET_PAGES_END_INDEX,
} from './paginatoin.types'
import api from '../../apis/api'

export const getCount = () => async dispatch => {
  const response = await api.get('/users/count')
  dispatch({
    type: GET_COUNT,
    payload: response.data,
  })
}

export const setLimit = limit => {
  return {
    type: SET_LIMIT,
    payload: limit,
  }
}

export const setCurrentPage = currentPage => {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage,
  }
}

export const setPageStartIndex = pageStartIndex => {
  return {
    type: SET_PAGES_START_INDEX,
    payload: { pageStartIndex },
  }
}

export const setPageEndIndex = pageEndIndex => {
  return {
    type: SET_PAGES_END_INDEX,
    payload: { pageEndIndex },
  }
}
