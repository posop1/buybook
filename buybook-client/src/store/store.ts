import { IUser } from '@/types/user'
import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import auth from './modules/auth'
import cart from './modules/cart'

export interface State {
  user: IUser
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  modules: {
    auth,
    cart
  }
})
