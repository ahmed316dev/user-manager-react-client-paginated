import { IS_EMAIL_UNIQUE, IS_USER_UPDATE } from './validation.types'
import { IS_PHONE_UNIQUE } from './validation.types'
import api from '../../apis/api'

export const isEmailUnique = email => async dispatch => {
  const response = await api.get(`/users/isemailunique?email=${email}`)
  dispatch({
    type: IS_EMAIL_UNIQUE,
    payload: response.data,
  })
}

export const isPhoneUnique = phone => async dispatch => {
  const response = await api.get(`/users/isphoneunique?email=${phone}`)
  dispatch({
    type: IS_PHONE_UNIQUE,
    payload: response.data,
  })
}
