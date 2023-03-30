import { IAuthState } from './types'

export const checkAuth = (state: IAuthState) => Boolean(state.token)

export const getUser = (state: IAuthState) => state.user

export const getUserStatus = (state: IAuthState) => state.status
