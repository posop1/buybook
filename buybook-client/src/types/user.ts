export interface IUser {
  _id: string
  username: string
  password: string
  favoriteBooks: string[]
  createdAt: Date
  updatedAt: Date
  __v: number
}
