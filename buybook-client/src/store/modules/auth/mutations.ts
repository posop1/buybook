import { IUser } from '@/types/user'
import { AuthState } from './types'

export const setUser = (
  state: AuthState,
  payload: { status: string; user: IUser; token: string }
) => {
  state.user = payload.user
  state.token = payload.token
  state.status = payload.status
}

export const logoutUser = (state: AuthState) => {
  state.user = null
  state.token = null
  localStorage.removeItem('token')
}
