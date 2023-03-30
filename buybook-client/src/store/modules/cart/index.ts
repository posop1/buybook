import { ICartState } from './types'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state: ICartState = {
  books: []
}

export default {
  state,
  actions,
  getters,
  mutations
}
