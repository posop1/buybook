import api from '@/api/instance'
import { ActionsParams, AuthState, ILoginFetch, IRegisterFetch, fetchParams } from './types'

export const registerUser = async (
  { commit }: ActionsParams,
  { username, password }: fetchParams
) => {
  try {
    const { data } = await api.post<IRegisterFetch>('/auth/register', {
      username,
      password
    })

    commit('setUser', { user: data.newUser, token: data.token, status: data.message })
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
  } catch (error) {
    console.log(error)
    commit('setUser', { status: 'error' })
  }
}

export const loginUser = async ({ commit }: ActionsParams, { username, password }: fetchParams) => {
  try {
    const { data } = await api.post<ILoginFetch>('/auth/login', {
      username,
      password
    })

    console.log(data)

    if (data.token) {
      commit('setUser', { user: data.user, token: data.token, status: data.message })
      localStorage.setItem('token', data.token)
    }
  } catch (error: any) {
    console.log(error)
    commit('setUser', { status: error?.response?.data.message })
  }
}

export const getMe = async ({ commit }: ActionsParams) => {
  const { data } = await api.get('/auth/me')

  commit('setUser', { user: data.user, token: data.token, status: data.message })
}

export const logout = ({ commit }: ActionsParams) => {
  commit('logoutUser')
}
