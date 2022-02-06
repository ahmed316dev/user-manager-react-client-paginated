import { IS_EMAIL_UNIQUE } from './validation.types'
import { IS_PHONE_UNIQUE } from './validation.types'

const validationReducer = (state = {}, action) => {
  switch (action.type) {
    case IS_EMAIL_UNIQUE:
      return { ...state, isEmailUnique: action.payload }
    case IS_PHONE_UNIQUE:
      return { ...state, isPhoneUnique: action.payload }

    default:
      return state
  }
}

export default validationReducer
