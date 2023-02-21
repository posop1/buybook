import { IUser } from '@/types/user'
import { Commit } from 'vuex'

export interface AuthState {
  user: IUser | null
  token: string | null
  status: string | null
  isLoading: boolean
}

export interface IRegisterFetch {
  message: string
  newUser: IUser
  token: string
}
export interface ILoginFetch {
  message: string
  user: IUser
  token: string
}

export interface ActionsParams {
  commit: Commit
}

export interface fetchParams {
  username: string
  password: string
}
