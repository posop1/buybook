import { IUser } from '@/types/user'
import { IAuthState } from './types'

export const setUser = (
  state: IAuthState,
  payload: { status: string; user: IUser; token: string }
) => {
  state.user = payload.user
  state.token = payload.token
  state.status = payload.status
}

export const logoutUser = (state: IAuthState) => {
  state.user = null
  state.token = null
  localStorage.removeItem('token')
}
