import { IBook } from '@/types/book'
import { ICartState } from './types'

export const addBookInCart = (state: ICartState, payload: { book: IBook }) => {
  state.books.push(payload.book)
}

export const removeBookInCart = (state: ICartState, payload: { book: IBook }) => {
  state.books = state.books.filter((book) => book._id !== payload.book._id)
  console.log(state.books)
}
