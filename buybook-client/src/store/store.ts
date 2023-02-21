import { IBook } from '@/types/book'
import { IUser } from '@/types/user'
import { Store, createStore } from 'vuex'
import { InjectionKey } from 'vue'
import auth from './modules/auth'

export interface State {
  user: IUser
  books: IBook[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  modules: {
    auth
  }
})
