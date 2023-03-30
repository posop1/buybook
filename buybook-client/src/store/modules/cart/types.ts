import { IBook } from '@/types/book'
import { Commit } from 'vuex'

export interface ICartState {
  books: IBook[]
}

export interface ActionsParams {
  commit: Commit
}
