import { AuthState } from './types'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  status: null,
  isLoading: true
}

export default {
  state,
  actions,
  getters,
  mutations
}
