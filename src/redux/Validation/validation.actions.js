import { IS_EMAIL_UNIQUE } from './validation.types'
import { IS_PHONE_UNIQUE } from './validation.types'
import api from '../../apis/api'

export const isEmailUnique = email => async dispatch => {
  const response = await api.post('/users/isemailunique', { email: email })
  dispatch({
    type: IS_EMAIL_UNIQUE,
    payload: response.data,
  })
}

export const isPhoneUnique = phone => async dispatch => {
  const response = await api.post('/users/isphoneunique', { phone: phone })
  dispatch({
    type: IS_PHONE_UNIQUE,
    payload: response.data,
  })
}
