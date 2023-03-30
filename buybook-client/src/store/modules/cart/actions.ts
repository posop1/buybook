import { IBook } from '@/types/book'
import { ActionsParams } from './types'

export const addBookInCart = ({ commit }: ActionsParams, book: IBook) => {
  commit('addBookInCart', { book: book })
}

export const removeBookInCart = ({ commit }: ActionsParams, book: IBook) => {
  commit('removeBookInCart', { book: book })
}
