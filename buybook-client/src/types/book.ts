export interface IBook {
  _id: string
  title: string
  description: string
  author: string
  imgUrl: string
  rating: number
  views: number
  price: number
  genres: string[]
  comments: string[]
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface IComment {
  _id: string
  comment: string
  createdAt: Date
  updatedAt: Date
}

export interface IFetchBooks {
  books: IBook[]
  totalPage: number
  currentPage: number
}
